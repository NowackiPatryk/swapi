import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginatedGraphql {
  @Field(() => Int, { nullable: true })
  count: number;
  @Field(() => String, { nullable: true })
  next: string;
  @Field(() => String, { nullable: true })
  previous: string | null;
}

export interface PaginatedResponse<T = unknown> {
  results: T[];
}
