import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterCryptoNotifTable1725621989850 implements MigrationInterface {
  name = 'AlterCryptoNotifTable1725621989850';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "crypto_notif" DROP COLUMN "condition"`,
    );
    await queryRunner.query(`DROP TYPE "public"."crypto_notif_condition_enum"`);
    await queryRunner.query(
      `ALTER TABLE "crypto_notif" ALTER COLUMN "enable" SET DEFAULT '1'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "crypto_notif" ALTER COLUMN "enable" SET DEFAULT true`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."crypto_notif_condition_enum" AS ENUM('eq', 'gt', 'lt', 'gte', 'lte')`,
    );
    await queryRunner.query(
      `ALTER TABLE "crypto_notif" ADD "condition" "public"."crypto_notif_condition_enum" NOT NULL DEFAULT 'eq'`,
    );
  }
}
