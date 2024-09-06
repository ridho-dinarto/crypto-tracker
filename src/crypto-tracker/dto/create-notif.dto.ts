import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export enum Tokens {
  WETH = 'WETH',
  MATIC = 'MATIC',
}

export class CreateNotifDto {
  @ApiProperty({ enum: Tokens })
  @IsNotEmpty()
  chain: Tokens;

  @ApiProperty()
  @IsNotEmpty()
  dollar: number;

  @ApiProperty()
  @IsNotEmpty()
  email: string;
}
