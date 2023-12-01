import { MigrationInterface, QueryRunner } from "typeorm";

export class Wallet1701412624290 implements MigrationInterface {
    name = 'Wallet1701412624290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "wallet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "balance" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "authuser" ADD "walletId" uuid`);
        await queryRunner.query(`ALTER TABLE "authuser" ADD CONSTRAINT "UQ_b21bcb38ea3095f28e776e05fe9" UNIQUE ("walletId")`);
        await queryRunner.query(`ALTER TABLE "authuser" ADD CONSTRAINT "FK_b21bcb38ea3095f28e776e05fe9" FOREIGN KEY ("walletId") REFERENCES "wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authuser" DROP CONSTRAINT "FK_b21bcb38ea3095f28e776e05fe9"`);
        await queryRunner.query(`ALTER TABLE "authuser" DROP CONSTRAINT "UQ_b21bcb38ea3095f28e776e05fe9"`);
        await queryRunner.query(`ALTER TABLE "authuser" DROP COLUMN "walletId"`);
        await queryRunner.query(`DROP TABLE "wallet"`);
    }

}
