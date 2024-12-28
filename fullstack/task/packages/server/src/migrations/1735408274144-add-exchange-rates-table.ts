import { MigrationInterface, QueryRunner } from "typeorm";

export class addExchangeRatesTable1735408274144 implements MigrationInterface {
    name = 'addExchangeRatesTable1735408274144'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "exchange_rates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAtUtc" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAtUtc" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleteDateUtc" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL, "country" character varying NOT NULL, "currency" character varying NOT NULL, "amount" numeric NOT NULL, "code" character varying NOT NULL, "rate" numeric NOT NULL, "fetchedAt" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_33a614bad9e61956079d817ebe2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "example" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAtUtc" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAtUtc" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleteDateUtc" TIMESTAMP WITH TIME ZONE, "version" integer NOT NULL, "name" character varying(255) NOT NULL, "value" character varying(255) NOT NULL, CONSTRAINT "PK_608dd5fd6f0783062b07346ed1c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "example"`);
        await queryRunner.query(`DROP TABLE "exchange_rates"`);
    }

}
