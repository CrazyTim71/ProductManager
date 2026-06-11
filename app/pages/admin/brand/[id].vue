<template>
    <view-edit-page
        :page
        @cancel="cancel"
        @save="save"
    />
</template>

<script setup lang="ts">
import type { EditPage } from '~~/types/components';
import type { DeviceBrand } from '@prisma/client';

const route = useRoute();
const router = useRouter();
const id = computed(() => route.params.id as string);

const { data: brand } = useFetch<DeviceBrand>(() => `/api/v1/admin/brand/${ id.value }`);

const page: Ref<EditPage> = ref({
    title: 'Create Brand',
    fields: [
        {
            label: 'Name',
            type: 'text',
            value: brand.value?.name || '',
        },
    ],
    isNew: true,
});

watch([brand, id], () => {
    page.value.title = id.value === 'new' ? 'Create Device Brand' : 'Edit Device Brand';
    page.value.fields = [
        { label: 'Name', type: 'text', value: brand.value?.name || '' },
    ];
    page.value.isNew = id.value === 'new';
});

const { showToast } = useToastManager();

function save() {
    const brand = {
        name: page.value.fields[0]?.value as string,
    };
    $fetch(id.value === 'new' ? '/api/v1/admin/brand' : `/api/v1/admin/brand/${ id.value }`, {
        method: id.value === 'new' ? 'POST' : 'PUT',
        body: brand,
    });

    showToast({
        message: 'Saved',
    });
}

function cancel() {
    router.push('/admin/brand');
}
</script>

