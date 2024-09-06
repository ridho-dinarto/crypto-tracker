import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoPriceEntity } from './relational/entities/crypto-price.entity';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { CryptoNotifEntity } from './relational/entities/crypto-notif.entity';

@Injectable()
export class CryptoPriceRepository {
  constructor(
    @InjectRepository(CryptoPriceEntity)
    private readonly cryptoPriceDB: Repository<CryptoPriceEntity>,

    @InjectRepository(CryptoNotifEntity)
    private readonly cryptoNotifDB: Repository<CryptoNotifEntity>,
  ) {}

  createBulk(data: CryptoPriceEntity[]) {
    const prices = this.cryptoPriceDB
      .createQueryBuilder()
      .insert()
      .into(CryptoPriceEntity)
      .values(data)
      .execute();

    return prices;
  }

  create(data: CryptoPriceEntity) {
    return this.cryptoPriceDB.save(this.cryptoPriceDB.create(data));
  }

  getLast24HoursPrice() {
    const oneDayAgo = new Date();
    oneDayAgo.setMinutes(oneDayAgo.getMinutes() - 24 * 60);
    return this.cryptoPriceDB.find({
      select: {
        name: true,
        symbol: true,
        price: true,
        tokenAddress: true,
        createdAt: true,
      },
      where: {
        createdAt: MoreThan(oneDayAgo),
      },
    });
  }

  getPriceOneHourAgo(data: CryptoPriceEntity) {
    const oneHourAgo = data.createdAt;
    oneHourAgo.setMinutes(oneHourAgo.getMinutes() - 60);
    return this.cryptoPriceDB.find({
      where: {
        createdAt: LessThan(oneHourAgo),
        name: data.name,
        symbol: data.symbol,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  createNotif(data: CryptoNotifEntity) {
    return this.cryptoNotifDB.save(this.cryptoNotifDB.create(data));
  }
}
