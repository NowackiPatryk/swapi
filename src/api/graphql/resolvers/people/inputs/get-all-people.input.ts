import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class GetAllPeopleInput {
  @Field(() => Int, {
    nullable: true,
    description: 'Page number used for pagination.',
  })
  page: number;

  @Field(() => String, {
    nullable: true,
    description: 'Search phrase.',
  })
  search: string;
}
