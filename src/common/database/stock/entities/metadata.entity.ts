import { Column, Entity, OneToMany } from "typeorm";
import { CustomBaseEntity } from "./base.entity";
import { StockPreferenceEntity } from "./stock-preference.entity";
import { TimeSeriesEntity } from "./time-series.entity";

@Entity("meta_data")
export class MetaDataEntity extends CustomBaseEntity {
  @Column({ nullable: true })
  information: string;

  @Column({ nullable: true })
  symbol: string;

  @Column({ nullable: true })
  lastRefreshed: string;

  @Column({ nullable: true })
  interval: string;

  @Column({ nullable: true })
  outputSize: string;

  @Column({ nullable: true })
  timeZone: string;

  @OneToMany(() => TimeSeriesEntity, (timeSeries) => timeSeries.metaData)
  timeSeries: TimeSeriesEntity;

  @OneToMany(
    () => StockPreferenceEntity,
    (stockPreferences) => stockPreferences.metaData
  )
  stockPreferences: StockPreferenceEntity[];
}
