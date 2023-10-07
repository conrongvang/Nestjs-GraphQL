import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { BaseResolver } from "common/base.resolver";
import { UsersDbService } from "common/database/stock/providers/user-db.service";
import { UserType } from "users/schemas/user.graphql";
import { CreateUserInput } from "./input/create-user.input";

@Resolver(() => UserType)
export class UsersResolver extends BaseResolver {
  constructor(private readonly userDbService: UsersDbService) {
    super(UsersResolver.name);
  }

  @Mutation(() => UserType)
  async createUser(
    @Args("input") input: CreateUserInput,
    @Context() _context: any
  ) {
    return this.userDbService.create(input);
  }

  @Query(() => [UserType])
  async users(@Context() _context: any) {
    return this.userDbService.findAll();
  }

  @Query(() => UserType)
  async user(@Args("username") username: string, @Context() _context: any) {
    return this.userDbService.findOne(username);
  }

  @Mutation(() => [UserType])
  async removeUser(
    @Args("username") username: string,
    @Context() context: any
  ) {
    await this.userDbService.remove(username);
    return this.users(context);
  }
}
