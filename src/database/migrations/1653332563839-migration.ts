import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1653332563839 implements MigrationInterface {
    name = 'migration1653332563839'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "event_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying(1000) NOT NULL, CONSTRAINT "PK_c5675e66b601bd4d0882054a430" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, CONSTRAINT "PK_d074114199e1996b57b04ac77ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, CONSTRAINT "REL_94f168faad896c0786646fa3d4" UNIQUE ("userId"), CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group_entity_users_user" ("groupEntityId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_a35283cdc1c926437f015447530" PRIMARY KEY ("groupEntityId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b507b3f451f4fd17945470940b" ON "group_entity_users_user" ("groupEntityId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a6d41e2a11a82f6df0d0984eb8" ON "group_entity_users_user" ("userId") `);
        await queryRunner.query(`CREATE TABLE "user_groups_group_entity" ("userId" uuid NOT NULL, "groupEntityId" uuid NOT NULL, CONSTRAINT "PK_ebb570d1aababbe86f1270782f6" PRIMARY KEY ("userId", "groupEntityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bdbb88d3177929524a55f8e6dc" ON "user_groups_group_entity" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c45ac7a149973fb2ab88c36283" ON "user_groups_group_entity" ("groupEntityId") `);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "FK_94f168faad896c0786646fa3d4a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_entity_users_user" ADD CONSTRAINT "FK_b507b3f451f4fd17945470940b9" FOREIGN KEY ("groupEntityId") REFERENCES "group_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "group_entity_users_user" ADD CONSTRAINT "FK_a6d41e2a11a82f6df0d0984eb87" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_groups_group_entity" ADD CONSTRAINT "FK_bdbb88d3177929524a55f8e6dc5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_groups_group_entity" ADD CONSTRAINT "FK_c45ac7a149973fb2ab88c362835" FOREIGN KEY ("groupEntityId") REFERENCES "group_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_groups_group_entity" DROP CONSTRAINT "FK_c45ac7a149973fb2ab88c362835"`);
        await queryRunner.query(`ALTER TABLE "user_groups_group_entity" DROP CONSTRAINT "FK_bdbb88d3177929524a55f8e6dc5"`);
        await queryRunner.query(`ALTER TABLE "group_entity_users_user" DROP CONSTRAINT "FK_a6d41e2a11a82f6df0d0984eb87"`);
        await queryRunner.query(`ALTER TABLE "group_entity_users_user" DROP CONSTRAINT "FK_b507b3f451f4fd17945470940b9"`);
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_94f168faad896c0786646fa3d4a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c45ac7a149973fb2ab88c36283"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bdbb88d3177929524a55f8e6dc"`);
        await queryRunner.query(`DROP TABLE "user_groups_group_entity"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a6d41e2a11a82f6df0d0984eb8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b507b3f451f4fd17945470940b"`);
        await queryRunner.query(`DROP TABLE "group_entity_users_user"`);
        await queryRunner.query(`DROP TABLE "token"`);
        await queryRunner.query(`DROP TABLE "group_entity"`);
        await queryRunner.query(`DROP TABLE "event_entity"`);
    }

}
