<template>
    <div
        class="selector"
        :class="{ 'selector--focused': focused }"
    >
        <div
            v-if="$slots.default"
            class="selector_label"
        >
            <slot/>
        </div>
        <div
            class="selector_container"
            @click="searchTextRef?.focus()"
        >
            <common-category
                v-for="c in selectedCategories"
                :key="c.slug"
                :category="c"
                deletable
                @selected="() => removeCategory(c)"
            />
            <icon
                name="material-symbols:arrow-drop-down"
                :size="22"
                style="cursor: pointer;"
                @click="showAll = !showAll"
            />
            <input
                ref="searchText"
                v-model="searchText"
                :size="searchText.length || 1"
                type="text"
            >
        </div>
        <div
            v-if="searchText.length >= 1 || showAll"
            class="selector_select"
        >
            <div class="selector_select_centerbox">
                <common-category
                    v-for="c in showAll ? leftCategories : searchCategories"
                    :key="c.slug"
                    addable
                    :category="c"
                    @selected="() => addCategory(c)"
                />
                {{ searchCategories?.length === 0 ? 'No category found' : '' }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { DeviceCategory } from '@prisma/client';

defineProps({
    height: {
        type: String,
    },
    disabled: {
        type: Boolean,
    },
});

defineSlots<{ default?: () => string }>();
const selectedCategories = defineModel<DeviceCategory[]>({
    type: Array as PropType<DeviceCategory[]>,
    default: () => [],
});

const focused = defineModel('focused', { type: Boolean });

const { data: allCategories } = useAsyncData<DeviceCategory[]>('categories', () => $fetch<DeviceCategory[]>('/api/v1/admin/device-category'), { immediate: true });
const leftCategories = computed(() => allCategories.value?.filter(e => !selectedCategories.value?.some(s => s.id === e.id)));
const searchText = ref('');
const searchTextRef = useTemplateRef('searchText');
const searchCategories = computed(() => leftCategories.value?.filter(e => e.slug.startsWith(searchText.value) || e.name.startsWith(searchText.value) || e.name.includes(searchText.value) || e.slug.includes(searchText.value)));
const showAll = ref(false);

function addCategory(c: DeviceCategory) {
    if (!selectedCategories.value) selectedCategories.value = [];
    if (!selectedCategories.value.some(e => e.id === c.id)) {
        selectedCategories.value.push(c);
    }
}

function removeCategory(c: DeviceCategory) {
    if (!selectedCategories.value) return;
    const idx = selectedCategories.value.findIndex(e => e.id === c.id);
    if (idx !== -1) selectedCategories.value.splice(idx, 1);
}
</script>

<style scoped lang="scss">
.selector {
    width: 100%;

    &_label {
        margin-bottom: 8px;
        font-size: 13px;
        font-weight: 600;

        @include mobile {
            font-size: 10px;
        }
    }

    &_container {
        cursor: text;

        display: flex;
        gap: 16px;
        align-items: center;


        padding: 8px 16px;
        border: 2px solid transparent;
        border-radius: 8px;

        background: $darkgray900;

        transition: 0.3s;

        @include hover {
            &:hover {
                border-color: $darkgray800;
            }
        }

        input {
            border: none;
            color: $typographyPrimary;
            background: none;

            &:focus {
                outline: none;
            }
        }
    }

    &_select {
        display: flex;
        flex-direction: column;
        align-items: center;

        margin-top: 8px;
        border: 2px solid transparent;
        border-radius: 8px;

        background: $darkgray900;

        transition: 0.3s;

        @include hover {
            &:hover {
                border-color: $darkgray800;
            }
        }

        &_centerbox {
            display: flex;
            flex-direction: column;
            gap: 4px;
            align-items: start;

            width: fit-content;
        }
    }

    &--focused .input_container {
        border-color: $primary500
    }
}
</style>
