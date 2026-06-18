import { syncRepairStatusFromDefaultSteps } from '~~/server/utils/backend/repairStatus';

type SyncAutomaticRequestStateInput = {
    requestId: string;
    actorUserId?: string | null;
};

export async function syncAutomaticRequestState(input: SyncAutomaticRequestStateInput) {
    return syncRepairStatusFromDefaultSteps(input.requestId, input.actorUserId ?? null);
}
