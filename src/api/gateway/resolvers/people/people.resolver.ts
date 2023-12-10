import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import {
  PeopleGraphql,
  PeopleListGraphql,
} from '../../../graphql/models/people.graphql';
import { PeopleService } from '../../../../domain/people/services/people.service';
import { GetAllPeopleInput } from './inputs/get-all-people.input';

@Resolver()
export class PeopleResolver {
  constructor(private readonly peopleService: PeopleService) {}

  @Query(() => PeopleListGraphql)
  async getAllPeople(@Args('GetAllPeopleInput') input: GetAllPeopleInput) {
    return this.peopleService.getAllPeople(input);
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
