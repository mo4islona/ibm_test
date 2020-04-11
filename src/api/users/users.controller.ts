import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';
import { UserEntity, UserEntityRelation } from './user.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  users: UserEntity[];

  constructor(
    @Inject(UsersService)
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async list(): Promise<UserEntity[]> {
    return await this.usersService.findAll([UserEntityRelation.Organization]);
  }

  @Get(':id')
  async one(@Param('id') id: number): Promise<UserEntity> {
    return await this.usersService.findOneElseThrow(id, [
      UserEntityRelation.Organization,
      UserEntityRelation.Roles,
    ]);
  }

  @Post()
  async add(@Body() req: UserDto): Promise<UserEntity> {
    return await this.usersService.addOne(req);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<UserEntity> {
    return await this.usersService.remove(id);
  }
}
