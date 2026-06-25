<template>
    <view-parameters :params="params"/>
</template>

<script setup lang="ts">
import type { ParametersPage } from '~~/types/components';
import type { PartCatalogEntry } from '~~/types/parts';

const router = useRouter();
const { data: parts, refresh } = useFetch<PartCatalogEntry[]>('/api/v1/staff/part-catalog');

const params = computed<ParametersPage>(() => {
    return {
        editable: true,
        removeable: true,
        title: 'Parts Catalog',
        onCreate: '/staff/parts/new',
        entries: (parts.value ?? []).map(part => ({
            onDelete: async () => {
                const confirmed = confirm(`Delete ${ part.name }?`);
                if (!confirmed) {
                    return;
                }

                await $fetch(`/api/v1/staff/part-catalog/${ part.id }`, {
                    method: 'DELETE',
                });

                await refresh();
            },
            onEdit: () => {
                router.push(`/staff/parts/${ part.id }`);
            },
            fields: [
                { label: 'Name', type: 'text', value: part.name },
                { label: 'Manufacturer', type: 'text', value: part.manufacturer ?? '' },
                { label: 'SKU', type: 'text', value: part.sku ?? '' },
            ],
        })),
    };
});
</script>
