<template>
    <common-page :title="`Reperaturauftrag von ${ repairReq?.customer.displayName }`">
        <ui-status :status="repairReq?.status"/>
        <div class="request-container">
            <div class="request-customer">
                <h2>Customer details</h2>
                {{ repairReq?.customer.displayName }} ({{ repairReq?.customer.username }}) /
                {{ repairReq?.customer.email }}
                <ui-button>Chat (WIP)</ui-button>
            </div>
            <div class="request-params">
                <h2>Customer Notes</h2>
                <labeled-text :value="repairReq?.subject">
                    Subject
                </labeled-text>
                <labeled-text :value="repairReq?.deviceName">
                    Geraetename
                </labeled-text>
                <labeled-text :value="repairReq?.deviceBrand">
                    Geraete Marke
                </labeled-text>
                <labeled-text :value="repairReq?.deviceModel">
                    Geraete Modell
                </labeled-text>
                <labeled-text :value="repairReq?.problemDescription">
                    Problembeschreibung
                </labeled-text>
                <labeled-text :value="repairReq?.alreadyTried ">
                    Hat versucht
                </labeled-text>
                <labeled-text :value="repairReq?.suspectedIssue ">
                    Deenk Ursache ist
                </labeled-text>
                <labeled-text :value="repairReq?.customerNotes">
                    Sonstiges
                </labeled-text>
            </div>
            <div class="request-steps">
                <h2>Request steps</h2>
                <ui-button @click="router.push(`/staff/request/${ id }/steps`)">Create</ui-button>
            </div>
        </div>
    </common-page>
</template>

<script lang="ts" setup>
import LabeledText from '~/components/ui/LabeledText.vue';

const route = useRoute();
const router = useRouter();
const id = route.params.id as string;

const { data: repairReq } = useFetch(`/api/v1/staff/request/${ id }`);
</script>

<style lang="scss" scoped>
.request {
    &-container {
        display: flex;
        flex-direction: row;
        gap: 32px;

        @include mobile {
            flex-direction: column;
        }
    }

    &-steps {
        padding: 16px;
        border-radius: 8px;
        background: $darkgray900;
    }

    &-customer {
        display: flex;
        flex-direction: column;
        gap: 16px;

        padding: 16px;
        border-radius: 8px;

        background: $darkgray900;
    }

    &-params {
        display: flex;
        flex-direction: column;
        gap: 16px;

        padding: 16px;
        border-radius: 8px;

        background: $darkgray900;
    }
}
</style>
