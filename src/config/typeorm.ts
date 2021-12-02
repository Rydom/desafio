import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";
import * as dotenv from 'dotenv';
dotenv.config()

export const ormOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST||'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_DATABASE || 'postgres',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [join(__dirname, '..', 'entities', '*.entity.{ts,js}')],
  synchronize: true,
}