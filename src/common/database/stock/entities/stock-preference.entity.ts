import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { CustomBaseEntity } from "./base.entity";
import { MetaDataEntity } from "./metadata.entity";
import { UserEntity } from "./user.entity";

@Entity("stock_preferences")
export class StockPreferenceEntity extends CustomBaseEntity {
  @Column()
  symbol: string;

  @Column({ nullable: true })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.stockPreferences)
  @JoinColumn({ name: "userId" })
  user: UserEntity;

  @Column({ nullable: true })
  metaDataId: string;

  @ManyToOne(() => MetaDataEntity, (metaData) => metaData.stockPreferences)
  @JoinColumn({ name: "metaDataId" })
  metaData: MetaDataEntity;
}
