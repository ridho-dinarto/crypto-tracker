import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrytoTrackerService } from './crypto-tracker.service';
import { CreateNotifDto } from './dto/create-notif.dto';

@ApiTags('Crypto Tracker')
@Controller({
  path: 'crypto-tracker',
  version: '1',
})
export class CryptoTrackerController {
  constructor(private cryptoTrackerService: CrytoTrackerService) {}

  @Post('/notif')
  @HttpCode(HttpStatus.CREATED)
  async createPost(@Body() createNotifDto: CreateNotifDto) {
    return await this.cryptoTrackerService.createNotif(createNotifDto);
  }

  @Get()
  async getCryptoPrice() {
    return this.cryptoTrackerService.getLast24HoursPrice();
  }
}
