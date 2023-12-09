import { Module } from '@nestjs/common';
import { GraphqlModule } from './graphql/graphql.module';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [GraphqlModule, GatewayModule],
})
export class ApiModule {}
