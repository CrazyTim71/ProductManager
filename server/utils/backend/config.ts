export async function getOrCreateAppConfig() {
    const existingConfig = await prisma.appConfig.findUnique({
        where: { id: 'default' },
    });

    if (existingConfig) {
        return existingConfig;
    }

    return prisma.appConfig.create({
        data: {
            id: 'default',
            hourlyRate: 0,
        },
    });
}
