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
import { UsersDbService } from "database/stock/providers/user-db.service";
import { InvestmentPortfolioType } from "investment-portfolios/schema/investment-portfolio.graphql";
import { UserType } from "users/schema/user.graphql";
import { CreateInvestmentPortfolioInput } from "./input/create-investment-portfolio.input";
import { QueryInvestmentPortfolioInput } from "./input/query-investment-portfolio.input";

@Resolver(() => InvestmentPortfolioType)
export class InvestmentPortfoliosResolver extends BaseResolver {
  constructor(
    private readonly investmentPortfoliosResolver: InvestmentPortfolioDbService,
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
        await this.investmentPortfoliosResolver.createInvestmentPortfolio(
          input
        );
      return this.investmentPortfoliosResolver.getInvestmentPortfolioById(
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
    return this.investmentPortfoliosResolver.getListInvestmentPortfolio(query);
  }

  @Query(() => InvestmentPortfolioType)
  async investmentPortfolio(@Args("id") id: string) {
    return this.investmentPortfoliosResolver.getInvestmentPortfolioById(id);
  }

  @ResolveField(() => UserType)
  async user(@Parent() investmentPortfolio: InvestmentPortfolioType) {
    return this.usersDbService.findOne(investmentPortfolio.user.username);
  }
}
