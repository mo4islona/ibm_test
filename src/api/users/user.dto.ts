import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Validate,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Unique } from '../../db/validators/unique';
import { UserEntity } from './user.entity';
import { Exists } from '../../db/validators/exists';
import { RoleEntity } from '../roles/role.entity';

export class UserDto {
  @ApiPropertyOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Validate(Unique, [UserEntity], {
    message: 'login already exists',
  })
  login: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ type: [Number] })
  @IsNotEmpty()
  @IsArray()
  @IsNumber(
    {},
    {
      each: true,
    },
  )
  @ArrayMinSize(1)
  @Validate(Exists, [RoleEntity, 'id'], {
    message: 'one or more roles do not exists',
  })
  roles: number[];

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  organization: string;
}
