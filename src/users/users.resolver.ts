import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { BaseService } from "common/base.service";
import { UsersDbService } from "common/database/stock/providers/user-db.service";
import { UserSchema } from "users/schemas/user.graphql";
import { CreateUserInput } from "./input/create-user.input";

@Resolver(() => UserSchema)
export class UsersResolver extends BaseService {
  constructor(private readonly userDbService: UsersDbService) {
    super(UsersResolver.name);
  }

  @Mutation(() => UserSchema)
  async createUser(
    @Args("input") input: CreateUserInput,
    @Context() _context: any
  ) {
    return this.userDbService.create(input);
  }

  @Query(() => [UserSchema])
  async findAllUser(@Context() _context: any) {
    return this.userDbService.findAll();
  }

  @Query(() => UserSchema)
  async findOneUser(
    @Args("username") username: string,
    @Context() _context: any
  ) {
    return this.userDbService.findOne(username);
  }

  @Mutation(() => [UserSchema])
  async removeUser(
    @Args("username") username: string,
    @Context() context: any
  ) {
    await this.userDbService.remove(username);
    return this.findAllUser(context);
  }
}
