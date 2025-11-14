import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateTasksTable1762907668986 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
