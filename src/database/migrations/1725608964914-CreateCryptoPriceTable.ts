import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCryptoPriceTable1725608964914 implements MigrationInterface {
  name = 'CreateCryptoPriceTable1725608964914';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "crypto_price" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "symbol" character varying NOT NULL, "price" double precision NOT NULL, "tokenAddress" character varying NOT NULL, CONSTRAINT "PK_e759b6f039a25ca0fd9d70cac44" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "crypto_price"`);
  }
}
