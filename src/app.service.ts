import { Injectable } from "@nestjs/common";
import { BaseService } from "common/base.service";
import {
  Citizenship,
  CountryCodeEnum,
  CountryEnum,
  RaceEnum,
  ReligionEnum,
} from "common/constants";

@Injectable()
export class AppService extends BaseService {
  getEnumApp() {
    return {
      Citizenship,
      ReligionEnum,
      RaceEnum,
      CountryCodeEnum,
      CountryEnum,
    };
  }
}
