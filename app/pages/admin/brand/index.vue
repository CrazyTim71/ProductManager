<template>
    <view-parameters :params="params"/>
</template>

<script setup lang="ts">
import type { DeviceBrand } from '@prisma/client';
import type { ParametersPage } from '~~/types/components';

const router = useRouter();

const { data: brands, refresh: refreshBrands } = useFetch<DeviceBrand[]>('/api/v1/admin/brand');
const params: ComputedRef<ParametersPage> = computed(() => {
    return {
        editable: true,
        removeable: true,
        title: 'Brands',
        onCreate: '/admin/brand/new',
        entries: brands.value?.map(brand => ({
            onDelete: () => {
                const confirmer = confirm(`Bist du sicher dass du ${ brand.name } loeschen willst?`);

                if (confirmer) {
                    $fetch(`/api/v1/admin/brand/${ brand.id }`, {
                        method: 'DELETE',
                    });
                    refreshBrands();
                }
            },
            onEdit: () => {
                router.push(`/admin/brand/${ brand.id }`);
            },
            fields: [
                {
                    label: 'Name',
                    type: 'text',
                    value: brand.name,
                },
            ],

        })) ?? [],
    };
});
</script>
