import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseService } from "common/base.service";
import { DeleteResult, Repository } from "typeorm";
import { CreateUserDto } from "../../../users/dto/create-user.dto";
import { UserEntity } from "../entities/user.entity";

export interface IUsersRepository {
  create(createUserDto: CreateUserDto): Promise<CreateUserDto>;
  findAll(): Promise<UserEntity[]>;
  findOne(id: string): Promise<UserEntity | null>;
  remove(id: string): Promise<DeleteResult>;
}

@Injectable()
export class UsersDbService extends BaseService implements IUsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {
    super(UsersDbService.name);
  }

  async create(createUserDto: Partial<UserEntity>): Promise<UserEntity> {
    const ent = this.userRepository.create(createUserDto);
    return this.userRepository.save(ent);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.findBy({});
  }

  async findOne(username: string): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ username });
  }

  async remove(username: string): Promise<DeleteResult> {
    return this.userRepository.softDelete({ username });
  }
}
