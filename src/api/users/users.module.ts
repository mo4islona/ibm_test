import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEntity } from './user.entity';
import { OrganizationsModule } from '../organizations/organizations.module';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    RolesModule,
    OrganizationsModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
