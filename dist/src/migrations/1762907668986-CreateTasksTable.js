"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTasksTable1762907668986 = void 0;
class CreateTasksTable1762907668986 {
    name = 'CreateTasksTable1762907668986';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(100) NOT NULL, "description" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "tasks"`);
    }
}
exports.CreateTasksTable1762907668986 = CreateTasksTable1762907668986;
//# sourceMappingURL=1762907668986-CreateTasksTable.js.map