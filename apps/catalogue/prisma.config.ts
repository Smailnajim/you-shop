import path from 'node:path';
import { defineConfig } from 'prisma/config';

export default defineConfig({
    earlyAccess: true,
    schema: path.join('apps', 'catalogue', 'src', 'prisma', 'schema.prisma'),
    migrate: {
        async url() {
            return process.env.CATALOGUE_DATABASE_URL || '';
        },
    },
});
