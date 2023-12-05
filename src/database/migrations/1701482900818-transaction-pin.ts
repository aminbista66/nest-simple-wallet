import { MigrationInterface, QueryRunner } from "typeorm";

export class TransactionPin1701482900818 implements MigrationInterface {
    name = 'TransactionPin1701482900818'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authuser" ADD "transactionPin" character varying(4) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "authuser" DROP COLUMN "transactionPin"`);
    }

}
