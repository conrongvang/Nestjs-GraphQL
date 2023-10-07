import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { BaseService } from "common/base.service";
import { Repository } from "typeorm";
import { InvestmentPortfolioEntity } from "../entities/investment-portfolio.entity";

@Injectable()
export class InvestmentPortfolioDbService extends BaseService {
  constructor(
    @InjectRepository(InvestmentPortfolioEntity)
    private investmentPortfolioRepository: Repository<InvestmentPortfolioEntity>
  ) {
    super(InvestmentPortfolioDbService.name);
  }

  async createInvestmentPortfolio(input: Partial<InvestmentPortfolioEntity>) {
    const ent = this.investmentPortfolioRepository.create(
      plainToClass(InvestmentPortfolioEntity, input)
    );
    return this.investmentPortfolioRepository.save(ent);
  }

  async getListInvestmentPortfolio(query?: {
    userId?: string;
    symbol?: string;
    quantity?: number;
  }) {
    return this.investmentPortfolioRepository.find({
      where: { ...query },
      relations: ["user"],
    });
  }

  async getInvestmentPortfolioById(id: string) {
    return this.investmentPortfolioRepository.findOne({
      where: { id },
      relations: ["user"],
    });
  }
}
