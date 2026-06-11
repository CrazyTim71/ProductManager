import { crud } from '../../../../utils/backend/crud';

export default crud(prisma.repairRequest, {
    resourceName: 'Request',
    list: {
        run: async () => prisma.repairRequest.findMany({
            orderBy: { queuePosition: 'asc' },
            include: {
                device: {
                    include: {
                        device: {
                            include: {
                                deviceCategories: {
                                    include: {
                                        category: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        }),
    },
});
