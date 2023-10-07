import { Field, ID, ObjectType } from "@nestjs/graphql";
import { StockPreferenceType } from "stock/schemas/stock-preference.graphql";

@ObjectType()
export class UserType {
  @Field(() => ID)
  id: string;

  @Field(() => Date, { nullable: true })
  createdDate: Date;

  @Field(() => Date, { nullable: true })
  updatedDate: Date;

  @Field(() => Date, { nullable: true })
  deletedDate: Date;

  @Field(() => String, { nullable: true })
  username: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  phone: string;

  @Field(() => String, { nullable: true })
  firstName: string;

  @Field(() => String, { nullable: true })
  lastName: string;

  @Field(() => String, { nullable: true })
  age: number;

  @Field(() => String, { nullable: true })
  address: string;

  @Field(() => String, { nullable: true })
  avatar: string;

  @Field(() => String, { nullable: true })
  role: string;

  @Field(() => [StockPreferenceType], { nullable: true })
  stockPreferences: StockPreferenceType[];
}
