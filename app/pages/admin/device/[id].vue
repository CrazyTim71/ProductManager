<template>
    <view-edit-page
        :page
        @cancel="cancel"
        @save="save"
    />
</template>

<script setup lang="ts">
import type { EditPage } from '~~/types/components';
import type { DeviceCategory } from '@prisma/client';
import type { DeviceWithRelations } from '~~/types/req'

const route = useRoute();
const router = useRouter();
const id = computed(() => route.params.id as string);

const { data: device } = useFetch<DeviceWithRelations>(() => `/api/v1/admin/device/${ id.value }`);

const page = ref<EditPage>({
    title: 'Create Device Type',
    fields: [
        { label: 'Name', type: 'text', value: '' },
        { label: 'Description', type: 'text', value: '' },
        { label: 'Category', type: 'category', options: [], value: [] },
        { label: 'Brand', type: 'brand', value: []},
    ],
    isNew: true,
});

watch([device, id], () => {
    if (!device.value?.deviceCategories) return;
    page.value.title = id.value === 'new' ? 'Create Device Type' : 'Edit Device Type';
    page.value.fields = [
        { label: 'Name', type: 'text', value: device.value?.name || '' },
        { label: 'Description', type: 'text', value: device.value?.description || '' },
        { label: 'Category', type: 'category', value: device.value?.deviceCategories.map(e => e.category) || [] },
        { label: 'Brand', type: 'label', value: device.value?.deviceBrand.name},
    ];
    page.value.isNew = id.value === 'new';
}, {
    immediate: true
});

const { showToast } = useToastManager();

function save() {
    const device = {
        name: page.value.fields[0]?.value as string,
        description: page.value.fields[1]?.value as string,
        categories: (page.value.fields[2]?.value as DeviceCategory[]).map(e => e.id),
    };
    $fetch(id.value === 'new' ? '/api/v1/admin/device' : `/api/v1/admin/device/${ id.value }`, {
        method: id.value === 'new' ? 'POST' : 'PUT',
        body: device,
    });

    showToast({
        message: 'Saved',
    });
}

function cancel() {
    router.push('/admin/device');
}
</script>

