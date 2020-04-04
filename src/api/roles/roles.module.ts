import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './role.entity';
import { RolesService } from './roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
