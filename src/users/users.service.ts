import { Injectable } from "@nestjs/common";
import { BaseService } from "common/base.service";
import { UserEntity } from "database/stock/entities/user.entity";
import { DeleteResult } from "typeorm";
import { UsersDbService } from "../database/stock/providers/user-db.service";
import { CreateUserDto } from "./dto/create-user.dto";

export interface IUsersService {
  create(createUserDto: CreateUserDto): Promise<CreateUserDto>;
  findAll(): Promise<UserEntity[]>;
  findOne(id: string): Promise<UserEntity | null>;
  remove(id: string): Promise<DeleteResult>;
}

@Injectable()
export class UsersService extends BaseService {
  constructor(private readonly usersRepository: UsersDbService) {
    super(UsersService.name);
  }

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }

  async findAll() {
    return this.usersRepository.findAll();
  }

  async findOne(username: string) {
    return this.usersRepository.findOne(username);
  }

  async remove(username: string) {
    await this.usersRepository.remove(username);
    return { message: "success" };
  }
}
