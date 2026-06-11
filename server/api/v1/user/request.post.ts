import { requestCreateSchema } from '~~/server/utils/backend/validation';

export default defineEventHandler(async event => {
    if (!event.context.user?.userId) {
        return;
    }
    const body = await readBody(event);

    const validationResult = requestCreateSchema.safeParse(body);
    if (!validationResult.success) {
        throw createApiError('Invalid input', 400, validationResult.error.issues);
    }

    const newRequest = await prisma.repairRequest.create({
        data: {
            customerId: event.context.user.userId,
            subject: `Reparaturanfrage ${ validationResult.data.deviceName }`,
            deviceName: validationResult.data.deviceName,
            deviceBrand: validationResult.data.deviceBrand,
            deviceModel: validationResult.data.deviceModel,
            problemDescription: validationResult.data.problemDescription,
            alreadyTried: validationResult.data.alreadyTried,
            suspectedIssue: validationResult.data.suspectedIssue,
            customerNotes: validationResult.data.customerNotes,
        },
    });

    return { message: 'Repair request created', data: newRequest, redirect: `/request/${ newRequest.id }` };
});
