import {
  Args,
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
import { UserType } from "users/schemas/user.graphql";
import { CreateInvestmentPortfolioInput } from "./input/create-investment-portfolio.input";
import { QueryInvestmentPortfolioInput } from "./input/query-investment-portfolio.input";

@Resolver(() => InvestmentPortfolioType)
export class InvestmentPortfoliosResolver extends BaseResolver {
  constructor(
    private readonly stockDbService: StockDbService,
    private readonly usersDbService: UsersDbService
  ) {
    super(InvestmentPortfoliosResolver.name);
  }

  @Mutation(() => InvestmentPortfolioType)
  async createInvestmentPortfolio(
    @Args("input") input: CreateInvestmentPortfolioInput
  ) {
    try {
      const investmentPortfolio =
        await this.stockDbService.createInvestmentPortfolio(input);
      return this.stockDbService.getInvestmentPortfolioById(
        investmentPortfolio.id
      );
    } catch (error) {
      this.logger.error(error.message, error);
    }
  }

  @Query(() => [InvestmentPortfolioType])
  async investmentPortfolios(
    @Args("query")
    query?: QueryInvestmentPortfolioInput
  ) {
    return this.stockDbService.getListInvestmentPortfolio(query);
  }

  @Query(() => InvestmentPortfolioType)
  async investmentPortfolio(@Args("id") id: string) {
    return this.stockDbService.getInvestmentPortfolioById(id);
  }

  @ResolveField(() => UserType)
  async user(@Parent() investmentPortfolio: InvestmentPortfolioType) {
    return this.usersDbService.findOne(investmentPortfolio.user.username);
  }
}
