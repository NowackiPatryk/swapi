import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpClientService } from './services/http-client.service';

@Module({
  providers: [HttpClientService],
  imports: [HttpModule],
  exports: [HttpClientService],
})
export class HttpClientModule {}
