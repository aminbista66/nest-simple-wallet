import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1701407315457 implements MigrationInterface {
    name = 'Initial1701407315457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "authuser" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(20) NOT NULL, "password" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "UQ_0ca57d846b1b8a7e5c2c353c0dc" UNIQUE ("username"), CONSTRAINT "UQ_b11a682436bbb5829543b343da6" UNIQUE ("email"), CONSTRAINT "PK_eef6826bbed5c715ee6d2349038" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "authuser"`);
    }

}
