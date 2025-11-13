import { DataSource, DataSourceOptions } from "typeorm";

export const AppDataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432, 
    username: 'admin',
    password: 'password123',
    database: 'nest_crud_api',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,
}   ;

export const AppDataSource = new DataSource(AppDataSourceOptions);