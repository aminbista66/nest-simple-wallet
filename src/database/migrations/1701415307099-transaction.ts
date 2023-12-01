import { MigrationInterface, QueryRunner } from "typeorm";

export class Transaction1701415307099 implements MigrationInterface {
    name = 'Transaction1701415307099'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "receiverId" uuid, "senderId" uuid, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_7185cb5bc0826915be077f0d882" FOREIGN KEY ("receiverId") REFERENCES "authuser"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transaction" ADD CONSTRAINT "FK_ed3e32981d7a640be5480effecf" FOREIGN KEY ("senderId") REFERENCES "authuser"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_ed3e32981d7a640be5480effecf"`);
        await queryRunner.query(`ALTER TABLE "transaction" DROP CONSTRAINT "FK_7185cb5bc0826915be077f0d882"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
    }

}
