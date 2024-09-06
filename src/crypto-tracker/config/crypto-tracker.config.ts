import { registerAs } from '@nestjs/config';

import { IsString } from 'class-validator';
import validateConfig from '../../utils/validate-config';
import { CryptoTrackerConfig } from './crypto-tracker-config.type';

class EnvironmentVariablesValidator {
  @IsString()
  MORALIS_API_KEY: string;
}

export default registerAs<CryptoTrackerConfig>('crypto_tracker', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    moralisApiKey: process.env.MORALIS_API_KEY,
  };
});
