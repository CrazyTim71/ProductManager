<template>
    <div
        class="work-item-status"
        :data-status="status"
    >
        {{ label }}
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

type RepairWorkItemStatus = 'BLOCKED' | 'DONE' | 'IN_PROGRESS' | 'PENDING';

const props = defineProps({
    status: {
        type: String as PropType<RepairWorkItemStatus>,
        required: true,
    },
});

const statusLabels: Record<RepairWorkItemStatus, string> = {
    BLOCKED: 'Blockiert',
    DONE: 'Erledigt',
    IN_PROGRESS: 'In Bearbeitung',
    PENDING: 'Ausstehend',
};

const label = computed(() => statusLabels[props.status]);
</script>

<style scoped lang="scss">
.work-item-status {
    width: fit-content;
    padding: 4px 10px;
    border-radius: 999px;

    font-size: 12px;
    font-weight: 700;
    color: $darkgray950;
    letter-spacing: 0.02em;

    background: $lightgray200;

    transition: background-color 200ms cubic-bezier(0.25, 1, 0.5, 1),
        color 200ms cubic-bezier(0.25, 1, 0.5, 1);

    &[data-status='DONE'] {
        background: $success600;
    }

    &[data-status='IN_PROGRESS'] {
        background: $warning600;
    }

    &[data-status='BLOCKED'] {
        background: $error600;
    }

    &[data-status='PENDING'] {
        background: $lightgray300;
    }
}

@media (prefers-reduced-motion: reduce) {
    .work-item-status {
        transition: none;
    }
}
</style>
