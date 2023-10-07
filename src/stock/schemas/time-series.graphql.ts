import { Field, ID, ObjectType } from "@nestjs/graphql";
import { MetdataDataType } from "./metadata.graphql";

@ObjectType()
export class TimeSeriresType {
  @Field(() => ID, { nullable: true })
  id: string;

  @Field()
  open: string;

  @Field()
  high: string;

  @Field()
  low: string;

  @Field()
  close: string;

  @Field()
  volume: string;

  @Field(() => MetdataDataType)
  metaData: MetdataDataType;
}
