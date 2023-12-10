import { Module } from '@nestjs/common';
import { ExampleResolver } from '../graphql/resolvers/example/example.resolver';
import { PeopleResolver } from '../graphql/resolvers/people/people.resolver';
import { DomainModule } from '../../domain/domain.module';
import { StatisticsResolver } from '../graphql/resolvers/statistics/statistics.resolver';

@Module({
  imports: [DomainModule],
  providers: [ExampleResolver, PeopleResolver, StatisticsResolver],
})
export class GatewayModule {}
