import { Test, TestingModule } from '@nestjs/testing';
import { StockPreferencesResolver } from './stock-preferences.resolver';

describe('StockPreferencesResolver', () => {
  let resolver: StockPreferencesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockPreferencesResolver],
    }).compile();

    resolver = module.get<StockPreferencesResolver>(StockPreferencesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
