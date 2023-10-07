import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "common/base.service";
import { Repository } from "typeorm";
import { MetaDataEntity } from "../entities/metadata.entity";

@Injectable()
export class StockDbService extends BaseService {
  constructor(
    @InjectRepository(MetaDataEntity)
    private metadataRepository: Repository<MetaDataEntity>
  ) {
    super(StockDbService.name);
  }

  async createMetadata(_data: JSON) {
    const ent = this.metadataRepository.create();
    return this.metadataRepository.save(ent);
  }
}
