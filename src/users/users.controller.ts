import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from "@nestjs/swagger";
import { BaseController } from "common/base.controller";
import { BaseService } from "common/base.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";

@Controller({ path: "users", version: "1" })
@ApiTags("Users")
export class UsersController extends BaseController {
  constructor(private readonly usersService: UsersService) {
    super(BaseService.name);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @ApiResponse({
    status: 200,
    schema: {
      type: "object",
      properties: {
        statusCode: { type: "number", default: 200 },
        data: { type: "object", $ref: getSchemaPath(CreateUserDto) },
      },
    },
  })
  @ApiOperation({ summary: "Create a user" })
  create(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    schema: {
      type: "object",
      properties: {
        statusCode: { type: "number", default: 200 },
        data: {
          type: "array",
          items: { type: "object", $ref: getSchemaPath(CreateUserDto) },
        },
      },
    },
  })
  @ApiOperation({ summary: "Get list user" })
  findAll() {
    return this.usersService.findAll();
  }

  @Get("/:username")
  @ApiResponse({
    status: 200,
    schema: {
      type: "object",
      properties: {
        statusCode: { type: "number", default: 200 },
        data: { type: "object", $ref: getSchemaPath(CreateUserDto) },
      },
    },
  })
  @ApiOperation({
    summary: "Get user detail",
    parameters: [{ required: true, name: "username", in: "path" }],
  })
  findOne(@Param("username") username: string) {
    return this.usersService.findOne(username);
  }

  @Delete("/:username")
  @ApiResponse({
    status: 200,
    schema: {
      type: "object",
      properties: {
        statusCode: { type: "number", default: 200 },
        message: { type: "string", example: "success" },
      },
    },
  })
  @ApiOperation({
    summary: "Delete a user",
    parameters: [{ required: true, name: "username", in: "path" }],
  })
  remove(@Param("username") username: string) {
    return this.usersService.remove(username);
  }
}
