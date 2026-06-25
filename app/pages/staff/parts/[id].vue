<template>
    <view-edit-page
        :page="page"
        @cancel="cancel"
        @save="save"
    />
</template>

<script setup lang="ts">
import type { EditPage } from '~~/types/components';
import type { PartCatalogEntry } from '~~/types/parts';

const route = useRoute();
const router = useRouter();
const id = computed(() => route.params.id as string);
const { showToast } = useToastManager();

const { data: part } = useFetch<PartCatalogEntry>(() => `/api/v1/staff/part-catalog/${ id.value }`);

const page = ref<EditPage>({
    title: 'Create catalog part',
    fields: [
        { label: 'Name', type: 'text', value: '' },
        { label: 'Manufacturer', type: 'text', value: '' },
        { label: 'SKU', type: 'text', value: '' },
        { label: 'Description', type: 'text', value: '' },
        { label: 'Unit Cost', type: 'number', value: 0 },
        { label: 'Retail Price', type: 'number', value: 0 },
    ],
    isNew: true,
});

watch([part, id], () => {
    page.value.title = id.value === 'new' ? 'Create catalog part' : 'Edit catalog part';
    page.value.fields = [
        { label: 'Name', type: 'text', value: part.value?.name ?? '' },
        { label: 'Manufacturer', type: 'text', value: part.value?.manufacturer ?? '' },
        { label: 'SKU', type: 'text', value: part.value?.sku ?? '' },
        { label: 'Description', type: 'text', value: part.value?.description ?? '' },
        { label: 'Unit Cost', type: 'number', value: Number(part.value?.unitCost ?? 0) },
        { label: 'Retail Price', type: 'number', value: Number(part.value?.retailPrice ?? 0) },
    ];
    page.value.isNew = id.value === 'new';
}, {
    immediate: true,
});

async function save() {
    const payload = {
        name: String(page.value.fields[0]?.value ?? ''),
        manufacturer: String(page.value.fields[1]?.value ?? ''),
        sku: String(page.value.fields[2]?.value ?? ''),
        description: String(page.value.fields[3]?.value ?? ''),
        unitCost: Number(page.value.fields[4]?.value ?? 0),
        retailPrice: Number(page.value.fields[5]?.value ?? 0),
    };

    await $fetch(id.value === 'new' ? '/api/v1/staff/part-catalog' : `/api/v1/staff/part-catalog/${ id.value }`, {
        method: id.value === 'new' ? 'POST' : 'PUT',
        body: payload,
    });

    showToast({
        message: 'Saved',
    });

    router.push('/staff/parts');
}

function cancel() {
    router.push('/staff/parts');
}
</script>
