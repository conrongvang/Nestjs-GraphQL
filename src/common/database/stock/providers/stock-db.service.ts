import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { BaseService } from "common/base.service";
import { Repository } from "typeorm";
import { MetaDataEntity } from "../entities/metadata.entity";
import { StockPreferenceEntity } from "../entities/stock-preference.entity";

@Injectable()
export class StockDbService extends BaseService {
  constructor(
    @InjectRepository(MetaDataEntity)
    private metadataRepository: Repository<MetaDataEntity>,
    @InjectRepository(StockPreferenceEntity)
    private stockPreferenceRepository: Repository<StockPreferenceEntity>
  ) {
    super(StockDbService.name);
  }

  async createMetadata(_data: JSON) {
    const ent = this.metadataRepository.create();
    return this.metadataRepository.save(ent);
  }

  async createStockPreference(input: Partial<StockPreferenceEntity>) {
    const ent = this.stockPreferenceRepository.create(
      plainToClass(StockPreferenceEntity, input)
    );
    return this.stockPreferenceRepository.save(ent);
  }

  async getListStockPreferences(query?: {
    userId?: string;
    metaDataId?: string;
  }) {
    return this.stockPreferenceRepository.find({
      where: { ...query },
      relations: ["user", "metaData"],
    });
  }

  async getStockPreferenceById(id: string) {
    return this.stockPreferenceRepository.findOne({
      where: { id },
      relations: ["user", "metaData"],
    });
  }
}
