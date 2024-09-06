import { EvmChain, EvmErc20Price } from '@moralisweb3/common-evm-utils';
import { Injectable } from '@nestjs/common';
import Moralis from 'moralis';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../config/config.type';
import { MailService } from '../mail/mail.service';
import { CryptoPriceRepository } from './infrastructure/persistence/crypto-tracker.repository';
import { CryptoPriceEntity } from './infrastructure/persistence/relational/entities/crypto-price.entity';
import { Cron } from '@nestjs/schedule';
import { CryptoNotifEntity } from './infrastructure/persistence/relational/entities/crypto-notif.entity';
import { CreateNotifDto } from './dto/create-notif.dto';

@Injectable()
export class CrytoTrackerService {
  constructor(
    private readonly mailService: MailService,
    private readonly configService: ConfigService<AllConfigType>,
    private readonly cryptoPriceRepository: CryptoPriceRepository,
  ) {}

  async onModuleInit() {
    await Moralis.start({
      apiKey: this.configService.get('crypto_tracker.moralisApiKey', {
        infer: true,
      }),
    });
  }

  @Cron('0 */2 * * * *')
  async saveTokenPriceScheduler() {
    const tokenPrices = await this.getErc20TokenPrice();
    if (!tokenPrices) return;

    tokenPrices?.map((data) => {
      void this.handleTokenPrice(data);
    });
  }

  async handleTokenPrice(data: EvmErc20Price) {
    const dbPrice = await this.saveTokenPrice(data);
    await this.checkPrice(dbPrice);
    // userNotif()
  }

  private async checkPrice(data: CryptoPriceEntity) {
    const hourAgo = await this.cryptoPriceRepository.getPriceOneHourAgo(data);

    if (!hourAgo || !hourAgo.length) return;

    const hourAgoPrice = hourAgo[0];
    const delta = (data.price - hourAgoPrice.price) / hourAgoPrice.price;

    if (delta > 0.03) {
      console.log('sending email', data.name, delta);
      void this.sendEmailNotif(data.name, hourAgoPrice.price, data.price);
    }
  }

  private async sendEmailNotif(
    token: string,
    oldPrice: number,
    newPrice: number,
  ) {
    await this.mailService.tokenPriceIncreaseEmailNotify(
      token,
      oldPrice,
      newPrice,
    );
  }

  private async saveTokenPrice(data: EvmErc20Price) {
    const cPrice = new CryptoPriceEntity();
    cPrice.name = data.tokenName as string;
    cPrice.symbol = data.tokenSymbol as string;
    cPrice.tokenAddress = data.tokenAddress as string;
    cPrice.price = data.usdPrice as number;
    return await this.cryptoPriceRepository.create(cPrice);
  }

  private async saveTokenPrices() {
    const tokenPrices = await this.getErc20TokenPrice();
    if (!tokenPrices) {
      return null;
    }

    const prices: CryptoPriceEntity[] = [];

    for await (const p of tokenPrices) {
      const cPrice = new CryptoPriceEntity();
      cPrice.name = p.tokenName as string;
      cPrice.symbol = p.tokenSymbol as string;
      cPrice.tokenAddress = p.tokenAddress as string;
      cPrice.price = p.usdPrice as number;
      prices.push(cPrice);
    }

    await this.cryptoPriceRepository.createBulk(prices);

    return {};
  }

  async getLast24HoursPrice() {
    return this.cryptoPriceRepository.getLast24HoursPrice();
  }

  private async getErc20TokenPrice() {
    try {
      const response = await Moralis.EvmApi.token.getMultipleTokenPrices(
        {
          chain: EvmChain.ETHEREUM,
          include: 'percent_change',
        },
        {
          tokens: [
            {
              // Eth token address
              tokenAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
            },
            {
              // Polygon (MATIC) token address
              tokenAddress: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
            },
          ],
        },
      );

      return response.result;
    } catch (error) {
      console.error(error);

      return null;
    }
  }

  createNotif(data: CreateNotifDto) {
    const createNotif = new CryptoNotifEntity();
    createNotif.chain = data.chain;
    createNotif.email = data.email;
    createNotif.dollar = data.dollar;
    return this.cryptoPriceRepository.createNotif(createNotif);
  }
}
