import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { BaseService } from "common/base.service";
import { Repository } from "typeorm";
import { StockPreferenceEntity } from "../entities/stock-preference.entity";

@Injectable()
export class StockPreferenceDbSerice extends BaseService {
  constructor(
    @InjectRepository(StockPreferenceEntity)
    private stockPreferenceRepository: Repository<StockPreferenceEntity>
  ) {
    super(StockPreferenceDbSerice.name);
  }

  async createStockPreference(input: Partial<StockPreferenceEntity>) {
    const ent = this.stockPreferenceRepository.create(
      plainToClass(StockPreferenceEntity, input)
    );
    return this.stockPreferenceRepository.save(ent);
  }

  async getListStockPreference(query?: { userId?: string; symbol?: string }) {
    return this.stockPreferenceRepository.find({
      where: { ...query },
      relations: ["user"],
    });
  }

  async getStockPreferenceById(id: string) {
    return this.stockPreferenceRepository.findOne({
      where: { id },
      relations: ["user"],
    });
  }
}
