export default defineEventHandler(async event => {
    if (event.node.req.url?.startsWith('/api/v1/admin/')) {
        await requireAdminAuth(event);
    }

    if (event.node.req.url?.startsWith('/api/v1/staff/')) {
        await requireStaffAuth(event);
    }

    if (event.node.req.url?.startsWith('/api/v1/user/')) {
        await requireAuth(event);
    }
});
