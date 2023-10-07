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
import { CreateStockPreferencesInput } from "stock/input/create-stock-preferences.input";
import { StockPreferenceType } from "stock/schemas/stock-preference.graphql";
import { UserType } from "users/schemas/user.graphql";

@Resolver(() => StockPreferenceType)
export class StockPreferencesResolver extends BaseResolver {
  constructor(
    private readonly stockDbService: StockDbService,
    private readonly usersDbService: UsersDbService
  ) {
    super(StockPreferencesResolver.name);
  }

  @Mutation(() => StockPreferenceType)
  async createStockPreference(
    @Args("input") input: CreateStockPreferencesInput
  ) {
    try {
      const newStockPreference =
        await this.stockDbService.createStockPreference(input);
      return this.stockDbService.getStockPreferenceById(newStockPreference.id);
    } catch (error) {
      this.logger.error(error.message, error);
    }
  }

  @ResolveField(() => UserType)
  async user(@Parent() stockPreference: StockPreferenceType) {
    return this.usersDbService.findOne(stockPreference.user.username);
  }

  @Query(() => [StockPreferenceType])
  async stockPreferences() {
    return this.stockDbService.getListStockPreference();
  }

  @Query(() => StockPreferenceType)
  async stockPreference(@Args("id") id: string) {
    return this.stockDbService.getStockPreferenceById(id);
  }
}
