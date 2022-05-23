import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1653332865096 implements MigrationInterface {
    name = 'migration1653332865096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" ADD "refresh-token" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "token" DROP COLUMN "refresh-token"`);
    }

}
