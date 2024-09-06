import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCryptoNotifTable1725620888939 implements MigrationInterface {
  name = 'CreateCryptoNotifTable1725620888939';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."crypto_notif_condition_enum" AS ENUM('eq', 'gt', 'lt', 'gte', 'lte')`,
    );
    await queryRunner.query(
      `CREATE TABLE "crypto_notif" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "chain" character varying NOT NULL, "dollar" double precision NOT NULL, "condition" "public"."crypto_notif_condition_enum" NOT NULL DEFAULT 'eq', "enable" boolean NOT NULL DEFAULT '1', "email" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_1dae0aa08d41556775d71f2f21e" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "crypto_notif"`);
    await queryRunner.query(`DROP TYPE "public"."crypto_notif_condition_enum"`);
  }
}
