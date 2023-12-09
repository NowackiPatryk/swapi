import { Field, ObjectType } from '@nestjs/graphql';
import { PaginatedGraphql, PaginatedResponse } from './paginated.graphql';

@ObjectType()
export class PeopleGraphql {
  @Field(() => String, { nullable: true })
  name: string;
  @Field(() => String, { nullable: true })
  height: string;
  @Field(() => String, { nullable: true })
  mass: string;
  @Field(() => String, { nullable: true })
  hair_color: string;
  @Field(() => String, { nullable: true })
  skin_color: string;
  @Field(() => String, { nullable: true })
  eye_color: string;
  @Field(() => String, { nullable: true })
  birth_year: string;
  @Field(() => String, { nullable: true })
  gender: string;
  @Field(() => String, { nullable: true })
  homeworld: string;
  @Field(() => [String], { nullable: true })
  films: string[];
  @Field(() => [String], { nullable: true })
  species: string[];
  @Field(() => [String], { nullable: true })
  vehicles: string[];
  @Field(() => [String], { nullable: true })
  starships: string[];
  @Field(() => String, { nullable: true })
  created: string;
  @Field(() => String, { nullable: true })
  edited: string;
  @Field(() => String, { nullable: true })
  url: string;
}

@ObjectType()
export class PeopleListGraphql
  extends PaginatedGraphql
  implements PaginatedResponse<PeopleGraphql>
{
  @Field(() => [PeopleGraphql], { nullable: true })
  results: PeopleGraphql[];
}
