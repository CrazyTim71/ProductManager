import type { DeviceWithCategories } from '~~/types/device';

import { crud } from '../../../../utils/backend/crud';
import { deviceCreateSchema } from '~~/server/utils/backend/validation';
import {DeviceWithRelations} from '~~/types/req' 

export default crud(prisma.device, {
    resourceName: 'Device',
    list: {
        run: async () => {
            const devices = await prisma.device.findMany({
                orderBy: { name: 'asc' },
                include: DeviceWithRelations,
            });

            return devices as DeviceWithCategories[];
        },
    },
    create: {
        schema: deviceCreateSchema,
        run: async ({ body }: { body: { name: string; description?: string; categories: string[] } }) => {
            const defaultBrand = await prisma.deviceBrand.findFirst({
                select: { id: true },
                orderBy: { name: 'asc' },
            });

            if (!defaultBrand) {
                throw createApiError('No device brand is available', 400);
            }

            const newDevice = await prisma.device.create({
                data: {
                    name: body.name,
                    description: body.description,
                    deviceBrandId: defaultBrand.id,
                    deviceCategories: {
                        create: body.categories.map((categoryId: string) => ({
                            category: {
                                connect: { id: categoryId },
                            },
                        })),
                    },
                },
            });

            return { message: 'Device created', data: newDevice };
        },
    },
});
