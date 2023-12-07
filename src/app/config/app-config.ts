import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IsNotEmpty, IsNumberString } from 'class-validator';
import { ModuleConfig } from '../../core/config/module-config.abstract';

export class AppConfigEnvs extends ModuleConfig {
  @IsNotEmpty()
  @IsNumberString()
  PORT: string;
}

@Injectable()
export class AppConfig {
  private readonly config: AppConfigEnvs = new AppConfigEnvs();;

  constructor(private readonly configService: ConfigService) {
    this.config.PORT = this.configService.get('PORT');

    this.config.validate();
  }

  get port() {
    return this.config.PORT;
  }
}
