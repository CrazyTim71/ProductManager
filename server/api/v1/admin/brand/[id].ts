import { crud } from '../../../../utils/backend/crud';
import { deviceBrandCreateSchema } from '~~/server/utils/backend/validation';

export default crud(prisma.deviceBrand, {
    resourceName: 'Brand',
    get: {
        run: async ({ record }: { record: unknown }) => record,
    },
    update: {
        schema: deviceBrandCreateSchema.partial(),
        notFoundMessage: 'Brand not found',
        run: async ({ id, body }: { id: string; body: { name?: string } }) => {
            const updatedBrand = await prisma.deviceBrand.update({
                where: { id },
                data: body.name ? { name: body.name } : {},
            });

            return { message: 'Brand updated', data: updatedBrand };
        },
    },
    delete: {
        notFoundMessage: 'Brand not found',
        run: async ({ id }: { id: string }) => {
            await prisma.deviceBrand.delete({
                where: { id },
            });

            return { message: 'Brand deleted' };
        },
    },
});
