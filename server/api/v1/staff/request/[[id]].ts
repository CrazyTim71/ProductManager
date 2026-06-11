import { crud } from '../../../../utils/backend/crud';

export default crud(prisma.repairRequest, {
    resourceName: 'Request',
    get: {
        run: async ({ record }: { record: unknown }) => record,
    },
});
