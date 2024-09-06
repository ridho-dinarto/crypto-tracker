import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CryptoTrackerController } from './crypto-tracker.controller';
import { CrytoTrackerService } from './crypto-tracker.service';
import { MailModule } from '../mail/mail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoPriceEntity } from './infrastructure/persistence/relational/entities/crypto-price.entity';
import { CryptoPriceRepository } from './infrastructure/persistence/crypto-tracker.repository';
import { CryptoNotifEntity } from './infrastructure/persistence/relational/entities/crypto-notif.entity';

@Module({
  imports: [
    ConfigModule,
    MailModule,
    TypeOrmModule.forFeature([CryptoPriceEntity, CryptoNotifEntity]),
  ],
  controllers: [CryptoTrackerController],
  providers: [CrytoTrackerService, CryptoPriceRepository],
  exports: [CrytoTrackerService],
})
export class CryptoTrackerModule {}
