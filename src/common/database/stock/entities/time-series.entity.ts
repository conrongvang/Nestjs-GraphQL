import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { CustomBaseEntity } from "./base.entity";
import { MetaDataEntity } from "./metadata.entity";

@Entity("time_series")
export class TimeSeriesEntity extends CustomBaseEntity {
  @Column({ nullable: true })
  timestamp: string;

  @Column({ nullable: true })
  open: string;

  @Column({ nullable: true })
  high: string;

  @Column({ nullable: true })
  low: string;

  @Column({ nullable: true })
  close: string;

  @Column({ nullable: true })
  volume: string;

  @Column({ nullable: true })
  metaDataId: string;

  @ManyToOne(() => MetaDataEntity, (metaData) => metaData.timeSeries)
  @JoinColumn({ name: "metaDataId" })
  metaData: MetaDataEntity;
}
