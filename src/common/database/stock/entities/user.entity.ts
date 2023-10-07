import { Exclude, Expose } from "class-transformer";
import { Column, Entity } from "typeorm";
import { CustomBaseEntity } from "./base.entity";

@Entity("users")
export class UserEntity extends CustomBaseEntity {
  @Expose()
  @Column("varchar", { length: 30, unique: true, nullable: true })
  username: string;

  @Expose()
  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  age: number;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  role: string;

  @Exclude()
  @Column({ name: "password", type: "varchar", nullable: true })
  password: string;

  @Exclude()
  @Column({ name: "salt", type: "varchar", nullable: true })
  salt: string;

  constructor(partial: Partial<UserEntity>) {
    super();
    Object.assign(this, partial);
  }
}
