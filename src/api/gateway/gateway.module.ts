import { Module } from '@nestjs/common';
import { ExampleResolver } from './resolvers/example/example.resolver';
import { PeopleResolver } from './resolvers/people/people.resolver';
import { PeopleModule } from '../../domain/people/people.module';

@Module({
  imports: [PeopleModule],
  providers: [ExampleResolver, PeopleResolver],
})
export class GatewayModule {}
