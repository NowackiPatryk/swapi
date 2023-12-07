import { Module } from '@nestjs/common';
import { ExampleResolver } from './example/example.resolver';

@Module({
  providers: [ExampleResolver],
})
export class GatewayModule {}
