import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty()
  @Expose()
  @IsString()
  username: string;

  @ApiPropertyOptional()
  @Expose()
  @IsString()
  @IsOptional()
  email: string;

  @ApiPropertyOptional()
  @Expose()
  @IsString()
  @IsOptional()
  phone: string;

  @ApiPropertyOptional()
  @Expose()
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiPropertyOptional()
  @Expose()
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiPropertyOptional()
  @Expose()
  @IsNumber()
  @IsOptional()
  age: number;

  @ApiPropertyOptional()
  @Expose()
  @IsString()
  @IsOptional()
  address: string;

  @ApiPropertyOptional()
  @Expose()
  @IsString()
  @IsOptional()
  avatar: string;

  @ApiProperty()
  @IsString()
  password: string;

  @Exclude()
  createdDate: Date;

  @Exclude()
  updatedDate: Date;
}
