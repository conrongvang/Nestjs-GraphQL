import { Test, TestingModule } from "@nestjs/testing";
import { InvestmentPortfoliosResolver } from "./investment-portfolios.resolver";

describe("InvestmentPortfoliosResolver", () => {
  let resolver: InvestmentPortfoliosResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvestmentPortfoliosResolver],
    }).compile();

    resolver = module.get<InvestmentPortfoliosResolver>(
      InvestmentPortfoliosResolver
    );
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
