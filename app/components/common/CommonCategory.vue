<template>
    <div
        class="category noselect"
        :class="addable || deletable ? 'category-selectable' : ''"
        @click="$emit('selected', $event)"
    >
        <div
            class="category-color"
            :style="{
                '--category-color': category?.color ?? '$lightgray300',
            }"
        ><icon
            v-if="addable"
            name="material-symbols:add"
        /> <icon
            v-if="deletable"
            name="material-symbols:close"
        /></div>
        {{ category?.slug }}
    </div>
</template>

<script setup lang="ts">
import type { DeviceCategory } from '@prisma/client';

defineProps({
    category: {
        type: Object as PropType<DeviceCategory>,
    },
    addable: {
        type: Boolean,
        default: false,
    },
    deletable: {
        type: Boolean,
        default: false,
    },
});

defineEmits({
    selected(e: MouseEvent) {
        return true;
    },
});
</script>

<style scoped lang="scss">
.category {
    display: flex;
    flex-direction: row;
    gap: 4px;
    align-items: center;
    justify-content: center;

    &-selectable {
        cursor: pointer;
    }

    &-color {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 20px;
        height: 20px;
        border-radius: 100%;

        background: var(--category-color);
    }
}
</style>
