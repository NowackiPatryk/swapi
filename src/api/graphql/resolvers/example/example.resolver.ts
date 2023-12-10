import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class ExampleResolver {
  @Query(() => String)
  async hello() {
    return 'Hello World!';
  }
}