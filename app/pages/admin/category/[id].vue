<template>
    <common-edit-page :page/>
</template>

<script setup lang="ts">
import type { EditPage } from '~~/types/components';
import type { DeviceCategory } from '@prisma/client';

const route = useRoute();
const id = computed(() => route.params.id as string);

const { data: category } = await useFetch<DeviceCategory>(() => `/api/admin/categories/${ id.value }`);

const page: ComputedRef<EditPage> = computed(() => {
    return {
        title: 'Edit Device Type',
        fields: [
            {
                label: 'Name',
                type: 'text',
                value: category.value?.name || '',
            },
            {
                label: 'Description',
                type: 'text',
                value: category.value?.description || '',
            },
        ],
        isNew: id.value === 'new',
    };
});
</script>

