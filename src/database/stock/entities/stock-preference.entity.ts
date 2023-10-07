import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { CustomBaseEntity } from "./base.entity";
import { UserEntity } from "./user.entity";

@Entity("stock_preferences")
export class StockPreferenceEntity extends CustomBaseEntity {
  @Column({ nullable: true })
  symbol: string;

  @Column({ nullable: true })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.stockPreferences)
  @JoinColumn({ name: "userId" })
  user: UserEntity;
}
