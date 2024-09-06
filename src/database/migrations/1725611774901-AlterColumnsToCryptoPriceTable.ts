import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterColumnsToCryptoPriceTable1725611774901
  implements MigrationInterface
{
  name = 'AlterColumnsToCryptoPriceTable1725611774901';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "crypto_price" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "crypto_price" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "crypto_price" ADD "deletedAt" TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "crypto_price" DROP COLUMN "deletedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "crypto_price" DROP COLUMN "updatedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "crypto_price" DROP COLUMN "createdAt"`,
    );
  }
}
