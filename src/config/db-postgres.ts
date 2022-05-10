import 'dotenv/config';
import { ConnectionOptions } from 'typeorm';

declare let process: {
    env: {
        DB_POSTGRES_HOSTNAME: string;
        DB_POSTGRES_USERNAME: string;
        DB_POSTGRES_PASSWORD: string;
        DB_POSTGRES_DATABASE: string;
        DB_POSTGRES_PORT: number;
    };
};

export const config: ConnectionOptions = {
    name: 'db-postgres',
    type: 'postgres',
    host: process.env.DB_POSTGRES_HOSTNAME,
    port: process.env.DB_POSTGRES_PORT,
    username: process.env.DB_POSTGRES_USERNAME,
    password: process.env.DB_POSTGRES_PASSWORD,
    database: process.env.DB_POSTGRES_DATABASE,
    ssl: false,
    logging: false,
    entities: ['./src/modules/**/infra/typeorm/entities/*{.ts,.js}'],
    migrations: [
        './src/shared/infra/typeorm/migrations/db-postgres/*{.ts,.js}',
    ],
    cli: {
        migrationsDir: './src/shared/infra/typeorm/migrations/db-postgres',
    },
};
