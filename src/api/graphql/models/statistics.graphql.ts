import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UniqueWordsGraphql {
  @Field(() => String, { nullable: true })
  word: string;

  @Field(() => Int, { nullable: true })
  count: number;
}