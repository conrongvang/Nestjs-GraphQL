import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { BaseResolver } from "common/base.resolver";
import { StockPreferenceDbSerice } from "database/stock/providers/stock-preference.service";
import { UsersDbService } from "database/stock/providers/user-db.service";
import { CreateStockPreferencesInput } from "stock-preferences/input/create-stock-preferences.input";
import { StockPreferenceType } from "stock-preferences/schema/stock-preference.graphql";
import { UserType } from "users/schema/user.graphql";

@Resolver(() => StockPreferenceType)
export class StockPreferencesResolver extends BaseResolver {
  constructor(
    private readonly stockPreferenceDbSerice: StockPreferenceDbSerice,
    private readonly usersDbService: UsersDbService
  ) {
    super(StockPreferencesResolver.name);
  }

  @Mutation(() => StockPreferenceType)
  async createStockPreference(
    @Args("input") input: CreateStockPreferencesInput
  ) {
    try {
      const stockPreference =
        await this.stockPreferenceDbSerice.createStockPreference(input);
      return this.stockPreferenceDbSerice.getStockPreferenceById(
        stockPreference.id
      );
    } catch (error) {
      this.logger.error(error.message, error);
    }
  }

  @Query(() => [StockPreferenceType])
  async stockPreferences() {
    return this.stockPreferenceDbSerice.getListStockPreference();
  }

  @Query(() => StockPreferenceType)
  async stockPreference(@Args("id") id: string) {
    return this.stockPreferenceDbSerice.getStockPreferenceById(id);
  }

  @ResolveField(() => UserType)
  async user(@Parent() stockPreference: StockPreferenceType) {
    return this.usersDbService.findOne(stockPreference.user.username);
  }
}
