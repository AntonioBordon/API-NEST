"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = exports.AppDataSourceOptions = void 0;
const typeorm_1 = require("typeorm");
exports.AppDataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: 'password123',
    database: 'nest_crud_api',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,
};
exports.AppDataSource = new typeorm_1.DataSource(exports.AppDataSourceOptions);
//# sourceMappingURL=datasource.js.map