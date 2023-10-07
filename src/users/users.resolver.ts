import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { BaseResolver } from "common/base.resolver";
import { StockDbService } from "common/database/stock/providers/stock-db.service";
import { UsersDbService } from "common/database/stock/providers/user-db.service";
import { InvestmentPortfolioType } from "stock/schemas/investment-portfolio.graphql";
import { StockPreferenceType } from "stock/schemas/stock-preference.graphql";
import { UserType } from "users/schemas/user.graphql";
import { CreateUserInput } from "./input/create-user.input";

@Resolver(() => UserType)
export class UsersResolver extends BaseResolver {
  constructor(
    private readonly userDbService: UsersDbService,
    private readonly stockDbService: StockDbService
  ) {
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

  @ResolveField(() => [StockPreferenceType])
  async stockPreferences(@Parent() user: UserType) {
    return this.stockDbService.getListStockPreference({ userId: user.id });
  }

  @ResolveField(() => [InvestmentPortfolioType])
  async investmentPortfolios(@Parent() user: UserType) {
    return this.stockDbService.getListInvestmentPortfolio({ userId: user.id });
  }
}
