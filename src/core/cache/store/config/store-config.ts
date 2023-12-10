import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModuleConfig } from '../../../config/module-config.abstract';

export class StoreConfigEnvs extends ModuleConfig {
  @IsNotEmpty()
  @IsString()
  REDIS_HOST: string;

  @IsNotEmpty()
  @IsNumberString()
  REDIS_PORT: string;
}

@Injectable()
export class StoreConfig {
  private readonly config: StoreConfigEnvs = new StoreConfigEnvs();

  constructor(private readonly configService: ConfigService) {
    this.config.REDIS_PORT = this.configService.get('REDIS_PORT');
    this.config.REDIS_HOST = this.configService.get('REDIS_HOST');

    this.config.validate();
  }

  get databasePort() {
    return this.config.REDIS_PORT;
  }

  get databaseHost() {
    return this.config.REDIS_HOST;
  }
}
