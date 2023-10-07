import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateStockPreferencesInput {
  @Field(() => String)
  symbol: string;

  @Field(() => String)
  userId: string;

  @Field({ nullable: true })
  metaDataId?: string;
}
