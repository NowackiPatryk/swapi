import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import {
  PeopleGraphql,
  PeopleListGraphql,
} from '../../../graphql/models/people.graphql';
import { PeopleService } from '../../../../domain/people/people.service';

@Resolver()
export class PeopleResolver {
  constructor(private readonly peopleService: PeopleService) {}

  @Query(() => PeopleListGraphql)
  async getAllPeople(
    @Args('page', {
      type: () => Int,
      description: 'Page number used for pagination.',
      nullable: true,
    })
    page?: number,
  ) {
    return this.peopleService.getAllPeople(page);
  }

  @Query(() => PeopleGraphql)
  async getPeopleById(
    @Args('id', {
      type: () => Int,
      description: 'Id of people.',
    })
    id: number,
  ) {
    return this.peopleService.getOneById(id);
  }
}
