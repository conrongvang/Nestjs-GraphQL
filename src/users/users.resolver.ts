import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { BaseResolver } from "common/base.resolver";
import { InvestmentPortfolioDbService } from "database/stock/providers/investment-portfolio.service";
import { StockPreferenceDbSerice } from "database/stock/providers/stock-preference.service";
import { UsersDbService } from "database/stock/providers/user-db.service";
import { InvestmentPortfolioType } from "investment-portfolios/schema/investment-portfolio.graphql";
import { StockPreferenceType } from "stock-preferences/schema/stock-preference.graphql";
import { UserType } from "users/schema/user.graphql";
import { CreateUserInput } from "./input/create-user.input";

@Resolver(() => UserType)
export class UsersResolver extends BaseResolver {
  constructor(
    private readonly userDbService: UsersDbService,
    private readonly stockPreferenceDbSerice: StockPreferenceDbSerice,
    private readonly investmentPortfoliosResolver: InvestmentPortfolioDbService
  ) {
    super(UsersResolver.name);
  }

  @Mutation(() => UserType)
  async createUser(@Args("input") input: CreateUserInput) {
    return this.userDbService.create(input);
  }

  @Query(() => [UserType])
  async users() {
    return this.userDbService.findAll();
  }

  @Query(() => UserType)
  async user(@Args("username") username: string) {
    return this.userDbService.findOne(username);
  }

  @Mutation(() => [UserType])
  async removeUser(@Args("username") username: string) {
    await this.userDbService.remove(username);
    return this.users();
  }

  @ResolveField(() => [StockPreferenceType])
  async stockPreferences(@Parent() user: UserType) {
    return this.stockPreferenceDbSerice.getListStockPreference({
      userId: user.id,
    });
  }

  @ResolveField(() => [InvestmentPortfolioType])
  async investmentPortfolios(@Parent() user: UserType) {
    return this.investmentPortfoliosResolver.getListInvestmentPortfolio({
      userId: user.id,
    });
  }
}
