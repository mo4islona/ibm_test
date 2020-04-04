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
import { UserEntity } from './user.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(
    @Inject(UsersService)
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async list(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async one(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.findOneElseThrow(id, [
      'organization',
      'roles',
    ]);
  }

  @Post()
  async add(@Body() req: UserDto): Promise<UserEntity> {
    return await this.usersService.addOne(req);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.remove(id);
  }
}
