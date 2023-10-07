import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { CustomBaseEntity } from "./base.entity";
import { UserEntity } from "./user.entity";

@Entity("investment_portfolios")
export class InvestmentPortfolioEntity extends CustomBaseEntity {
  @Column({ nullable: true })
  symbol: string;

  @Column({ nullable: true })
  quantity: number;

  @Column({ nullable: true })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.investmentPortfolios)
  @JoinColumn({ name: "userId" })
  user: UserEntity;
}
