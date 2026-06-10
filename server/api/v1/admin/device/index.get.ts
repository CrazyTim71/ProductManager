import type { DeviceWithCategories } from '~~/types/device';

export default defineEventHandler(async event => {
    const devices = await prisma.device.findMany({
        orderBy: { name: 'asc' },
        include: {
            deviceCategories: {
                include: {
                    category: true,
                },
            },
        },
    });

    return devices as DeviceWithCategories[];
});
