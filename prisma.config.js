const databaseUrl = process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/postgres?schema=public';

export default {
    schema: 'prisma/schema.prisma',
    migrations: {
        seed: 'node --import tsx prisma/seed.ts',
        path: 'prisma/migrations',
    },
    datasource: {
        url: databaseUrl,
    },
};
