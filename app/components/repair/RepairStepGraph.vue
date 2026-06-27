<template>
    <div class="step-graph">
        <div class="step-graph-header">
            <div class="step-graph-copy">
                <h2>Arbeitsschritte</h2>
            </div>

            <div class="step-graph-actions">
                <ui-button
                    v-if="editable && request.status === 'ACCEPTED'"
                    @click="initializeDefaultSteps"
                >
                    {{ workItems.length === 0 ? 'Standardschritte anlegen' : 'Zurücksetzen' }}
                </ui-button>
                <ui-button
                    v-if="editable"
                    @click="openCreate(0)"
                >
                    Schritt hinzufügen
                </ui-button>
                <ui-button
                    v-if="!route.path.endsWith('/graph')"
                    @click="router.push(`/request/${ request.id }/graph`)"
                >
                    <template #icon>
                        <Icon name="material-symbols:fullscreen"/>
                    </template>
                </ui-button>
                <ui-button
                    v-else
                    @click="router.back()"
                >
                    <template #icon>
                        <Icon name="material-symbols:fullscreen-exit"/>
                    </template>
                </ui-button>
            </div>
        </div>

        <div class="step-graph-overview">
            <div class="step-graph-stat">
                <div class="step-graph-stat-value">
                    <transition
                        mode="out-in"
                        name="stat-count"
                    >
                        <span
                            :key="completedWorkItems"
                            class="step-graph-stat-num"
                        >{{ completedWorkItems }}</span>
                    </transition>
                    <span class="step-graph-stat-sep"> / {{ workItems.length }}</span>
                </div>
                <span class="step-graph-stat-label">erledigt</span>
            </div>
        </div>

        <transition name="step-graph-fade">
            <common-box v-if="workItems.length === 0">
                <h3>Noch keine Schritte definiert</h3>
                <p v-if="editable">Standardschritte anlegen oder den ersten Schritt manuell hinzufügen.</p>
                <p v-else>Sobald das Team Schritte anlegt, werden sie hier angezeigt.</p>
            </common-box>
        </transition>

        <transition-group
            appear
            class="step-graph-phases"
            name="phase-list"
            tag="div"
        >
            <repair-step-phase
                v-for="(phase, i) in phases"
                :key="phase.startOrder"
                :editable="editable"
                :phase="phase"
                :style="{ '--phase-i': i }"
                @add="openCreate"
            >
                <template #default="{ index, item }">
                    <repair-work-item-card
                        :editable="editable"
                        :item="item"
                        :part-orders="partOrders"
                        :style="{ '--card-i': index }"
                        @addPart="openPartPopup(item.id)"
                        @changePartStatus="updatePartOrderStatus"
                        @delete="deleteWorkItem(item)"
                        @edit="openEdit(item)"
                        @toggleDone="toggleWorkItemCompletion(item)"
                        @toggleInProgress="toggleWorkItemInProgress(item)"
                    />
                </template>
            </repair-step-phase>
        </transition-group>

        <repair-work-item-editor
            v-if="editable"
            :default-order-index="editorDefaultOrderIndex"
            :is-visible="isEditorVisible"
            :item="editingItem"
            :title="editingItem ? 'Schritt bearbeiten' : 'Neuer Schritt'"
            @close="closeEditor"
            @save="saveWorkItem"
        />

        <common-popup
            :is-visible="isPartPopupVisible"
            submit-text="Teil hinzufügen"
            @close="closePartPopup"
            @submit="createPartOrder"
        >
            <div class="step-graph-part-popup">
                <h3>Ersatzteil hinzufügen</h3>
                <common-selector
                    v-model="selectedCatalogPart"
                    one
                    path="/api/v1/staff/part-catalog"
                >
                    <template #add="{ item }">
                        {{ item.name }}
                    </template>
                    <template #remove="{ item }">
                        {{ item.name }}
                    </template>
                </common-selector>
                <ui-input-number v-model="partQuantity">Menge</ui-input-number>
                <ui-input-text v-model="partSupplier">Lieferant</ui-input-text>
                <ui-input-number v-model="partEstimatedCost">Kalkulierter Preis</ui-input-number>
                <ui-text-area v-model="partNote">Notiz</ui-text-area>
            </div>
        </common-popup>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { PartCatalog, PartOrderStatus } from '@prisma/client';

import type { PartOrderResponse, PartOrderUpdatePayload } from '~~/types/parts';
import type { PartOrderWithRelationsType, RepairRequestWithRelationsType, RepairWorkItemWithRelationsType } from '~~/types/req';
import type { RepairWorkItemDraft } from '~~/app/utils/repairWorkItems';
import { groupRepairWorkItemsByPhase } from '~~/app/utils/repairWorkItems';

const props = defineProps({
    request: {
        type: Object as PropType<RepairRequestWithRelationsType>,
        required: true,
    },
    editable: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits<{ update: [] }>();

const workItems = ref<RepairWorkItemWithRelationsType[]>([]);
const partOrders = ref<PartOrderWithRelationsType[]>([]);
const isEditorVisible = ref(false);
const editingItem = ref<RepairWorkItemWithRelationsType | null>(null);
const editorDefaultOrderIndex = ref(0);
const isPartPopupVisible = ref(false);
const selectedWorkItemId = ref<string | null>(null);
const selectedCatalogPart = ref<PartCatalog[]>([]);
const partQuantity = ref(1);
const partSupplier = ref('');
const partEstimatedCost = ref<number | null>(null);
const partNote = ref('');
const router = useRouter();
const route = useRoute();

watch(() => props.request.workItems, items => {
    workItems.value = [...(items ?? [])];
}, { immediate: true });

watch(() => props.request.partOrders, orders => {
    partOrders.value = [...(orders ?? [])];
}, { immediate: true });

watch(selectedCatalogPart, parts => {
    const part = parts[0];
    if (part?.retailPrice != null) {
        partEstimatedCost.value = parseFloat(String(part.retailPrice));
    }
});

const phases = computed(() => groupRepairWorkItemsByPhase(workItems.value));
const completedWorkItems = computed(() => workItems.value.filter(workItem => workItem.status === 'DONE').length);

function closeEditor() {
    isEditorVisible.value = false;
    editingItem.value = null;
}

function closePartPopup() {
    isPartPopupVisible.value = false;
    selectedWorkItemId.value = null;
    selectedCatalogPart.value = [];
    partQuantity.value = 1;
    partSupplier.value = '';
    partEstimatedCost.value = null;
    partNote.value = '';
}

function openPartPopup(workItemId: string) {
    selectedWorkItemId.value = workItemId;
    isPartPopupVisible.value = true;
}

function openCreate(orderIndex: number) {
    editingItem.value = null;
    editorDefaultOrderIndex.value = orderIndex;
    isEditorVisible.value = true;
}

function openEdit(item: RepairWorkItemWithRelationsType) {
    editingItem.value = item;
    editorDefaultOrderIndex.value = item.orderIndex;
    isEditorVisible.value = true;
}

function upsertLocalWorkItem(workItem: RepairWorkItemWithRelationsType) {
    const existingIndex = workItems.value.findIndex(existing => existing.id === workItem.id);

    if (existingIndex === -1) {
        workItems.value = [...workItems.value, workItem].sort((left, right) => left.orderIndex - right.orderIndex);
        return;
    }

    const nextItems = [...workItems.value];
    nextItems.splice(existingIndex, 1, workItem);
    workItems.value = nextItems.sort((left, right) => left.orderIndex - right.orderIndex);
}

function removeLocalWorkItem(workItemId: string) {
    workItems.value = workItems.value.filter(workItem => workItem.id !== workItemId);
}

function upsertLocalPartOrder(partOrder: PartOrderWithRelationsType) {
    const existingIndex = partOrders.value.findIndex(existing => existing.id === partOrder.id);

    if (existingIndex === -1) {
        partOrders.value = [partOrder, ...partOrders.value];
        return;
    }

    const nextPartOrders = [...partOrders.value];
    nextPartOrders.splice(existingIndex, 1, partOrder);
    partOrders.value = nextPartOrders;
}

function buildPayload(draft: RepairWorkItemDraft) {
    const assignedStaffId = draft.assignedStaffId && draft.assignedStaffId.length > 0 ? draft.assignedStaffId : null;
    const workItemTypeId = draft.workItemTypeId ?? null;

    if (!workItemTypeId) {
        throw new Error('A work item type is required');
    }

    return {
        title: draft.title,
        description: draft.description.length > 0 ? draft.description : null,
        orderIndex: draft.orderIndex,
        workItemTypeId,
        assignedStaffId,
        laborMinutes: draft.laborMinutes,
        status: draft.status,
        completedAt: draft.status === 'DONE' ? new Date().toISOString() : null,
    };
}

async function saveWorkItem(draft: RepairWorkItemDraft) {
    const payload = buildPayload(draft);

    if (editingItem.value) {
        const response = await $fetch<{ data: RepairWorkItemWithRelationsType }>(`/api/v1/staff/request/${ props.request.id }/steps/${ editingItem.value.id }`, {
            body: payload,
            method: 'PUT',
        });

        upsertLocalWorkItem(response.data);
    }
    else {
        const response = await $fetch<{ data: RepairWorkItemWithRelationsType }>(`/api/v1/staff/request/${ props.request.id }/steps`, {
            body: payload,
            method: 'POST',
        });

        upsertLocalWorkItem(response.data);
    }

    closeEditor();
    emit('update');
}

async function deleteWorkItem(item: RepairWorkItemWithRelationsType) {
    const confirmed = confirm(`„${ item.title }" wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.`);

    if (!confirmed) {
        return;
    }

    await $fetch(`/api/v1/staff/request/${ props.request.id }/steps/${ item.id }`, {
        method: 'DELETE',
    });

    partOrders.value = partOrders.value.filter(po => po.workItemId !== item.id);
    removeLocalWorkItem(item.id);
    emit('update');
}

async function toggleWorkItemCompletion(item: RepairWorkItemWithRelationsType) {
    const completed = item.status !== 'DONE';

    const response = await $fetch<{ data: RepairWorkItemWithRelationsType }>(`/api/v1/staff/request/${ props.request.id }/steps/${ item.id }`, {
        body: {
            title: item.title,
            description: item.description ?? '',
            orderIndex: item.orderIndex,
            workItemTypeId: item.workItemType.id,
            assignedStaffId: item.assignedStaff?.id ?? null,
            laborMinutes: item.laborMinutes ?? null,
            status: completed ? 'DONE' : 'PENDING',
            completedAt: completed ? new Date().toISOString() : null,
        },
        method: 'PUT',
    });

    upsertLocalWorkItem(response.data);
    emit('update');
}

async function toggleWorkItemInProgress(item: RepairWorkItemWithRelationsType) {
    const inProgress = item.status !== 'IN_PROGRESS';

    const response = await $fetch<{ data: RepairWorkItemWithRelationsType }>(`/api/v1/staff/request/${ props.request.id }/steps/${ item.id }`, {
        body: {
            title: item.title,
            description: item.description ?? '',
            orderIndex: item.orderIndex,
            workItemTypeId: item.workItemType.id,
            assignedStaffId: item.assignedStaff?.id ?? null,
            laborMinutes: item.laborMinutes ?? null,
            status: inProgress ? 'IN_PROGRESS' : 'PENDING',
            completedAt: null,
        },
        method: 'PUT',
    });

    upsertLocalWorkItem(response.data);
    emit('update');
}

async function initializeDefaultSteps() {
    const response = await $fetch<RepairWorkItemWithRelationsType[]>(`/api/v1/staff/request/${ props.request.id }/steps/defaults`, {
        method: 'POST',
    });

    workItems.value = [...response];
    emit('update');
}

async function createPartOrder() {
    const workItemId = selectedWorkItemId.value;
    const catalogPart = selectedCatalogPart.value[0];

    if (!workItemId || !catalogPart) {
        return;
    }

    const response = await $fetch<PartOrderResponse>(`/api/v1/staff/request/${ props.request.id }/steps/${ workItemId }/parts`, {
        body: {
            catalogPartId: catalogPart.id,
            quantity: partQuantity.value,
            supplierName: partSupplier.value || undefined,
            estimatedCost: partEstimatedCost.value,
            note: partNote.value || undefined,
            workItemId,
        },
        method: 'POST',
    });

    upsertLocalPartOrder(response.data);
    closePartPopup();
    emit('update');
}

async function updatePartOrderStatus(partId: string, status: PartOrderStatus) {
    const payload: PartOrderUpdatePayload = {
        status,
    };

    const response = await $fetch<PartOrderResponse>(`/api/v1/staff/request/${ props.request.id }/parts/${ partId }`, {
        body: payload,
        method: 'PUT',
    });

    upsertLocalPartOrder(response.data);
    emit('update');
}
</script>

<style scoped lang="scss">
.step-graph {
    display: flex;
    flex-direction: column;
    gap: 18px;

    &-copy {
        display: flex;
        flex-direction: column;
        gap: 6px;
        max-width: 780px;
    }

    &-header {
        display: flex;
        gap: 16px;
        align-items: flex-start;
        justify-content: space-between;
    }

    &-actions {
        display: flex;
        gap: 12px;
        align-items: center;
        justify-content: flex-end;
    }

    &-overview {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 12px;
    }

    &-phases {
        display: flex;
        flex-direction: column;
        gap: 18px;
    }

    &-stat {
        display: flex;
        flex-direction: column;
        gap: 4px;

        padding: 14px 16px;
        border: 1px solid $lightgray125;
        border-radius: 8px;

        background: linear-gradient(180deg, rgb(255 255 255 / 4%), rgb(255 255 255 / 1%));

        &-value {
            display: flex;
            align-items: baseline;

            font-size: 22px;
            font-weight: 800;
            line-height: 1;
            color: $typographyPrimary;
        }

        &-num {
            display: inline-block;
        }

        &-label {
            font-size: 12px;
            color: $typographyPrimary;
            text-transform: uppercase;
            letter-spacing: 0.08em;
        }
    }

    &-legend {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 10px;
    }

    &-legend-item {
        display: flex;
        flex-direction: column;
        gap: 4px;

        padding: 12px 14px;
        border: 1px solid $lightgray125;
        border-radius: 14px;

        background: rgb(255 255 255 / 3%);

        &--empty {
            opacity: 0.6;
        }
    }

    &-legend-title {
        font-size: 13px;
        font-weight: 700;
        color: $typographyPrimary;
    }

    &-legend-label {
        font-size: 12px;
        color: $typographyPrimary;
    }

    &-part-popup {
        display: flex;
        flex-direction: column;
        gap: 12px;
        width: min(560px, 80vw);
    }
}

// Phase list — enter/leave
.phase-list-enter-active {
    transition: opacity 350ms cubic-bezier(0.25, 1, 0.5, 1),
        transform 350ms cubic-bezier(0.25, 1, 0.5, 1);
    transition-delay: calc(var(--phase-i, 0) * 70ms);
}

.phase-list-leave-active {
    transition: opacity 200ms ease-in;
}

.phase-list-enter-from {
    transform: translateY(14px);
    opacity: 0;
}

.phase-list-leave-to {
    opacity: 0;
}

// Empty state fade
.step-graph-fade-enter-active {
    transition: opacity 200ms ease-out;
}

.step-graph-fade-leave-active {
    transition: opacity 150ms ease-in;
}

.step-graph-fade-enter-from,
.step-graph-fade-leave-to {
    opacity: 0;
}

// Stat counter flip
.stat-count-enter-active {
    transition: opacity 150ms ease-out,
        transform 150ms cubic-bezier(0.25, 1, 0.5, 1);
}

.stat-count-leave-active {
    transition: opacity 100ms ease-in;
}

.stat-count-enter-from {
    transform: translateY(6px);
    opacity: 0;
}

.stat-count-leave-to {
    opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
    .phase-list-enter-active,
    .phase-list-leave-active,
    .step-graph-fade-enter-active,
    .step-graph-fade-leave-active,
    .stat-count-enter-active,
    .stat-count-leave-active {
        transition-delay: 0ms !important;
        transition-duration: 0.01ms !important;
    }
}
</style>
