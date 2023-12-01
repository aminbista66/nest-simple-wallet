import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: '.env' });

const config = {
    type: 'postgres',
    host: `${process.env.DB_HOST}`,
    port: `${process.env.DB_PORT}`,
    username: `${process.env.DB_USERNAME}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`,
    entities: ["src/**/*.entity{.ts,.js}"],
    migrations: ["src/database/migrations/*{.ts,.js}"],
    autoLoadEntities: true,
    synchronize: false,
}

export const connectionSource = new DataSource(config as DataSourceOptions);