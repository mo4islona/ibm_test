import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../api/users/user.entity';
import { OrganizationEntity } from '../api/organizations/organization.entity';
import { RoleEntity } from '../api/roles/role.entity';
import { Unique } from './validators/unique';
import { Exists } from './validators/exists';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGHOST || '127.0.0.1',
      port: parseInt(process.env.PGPORT, 10) || 5432,
      database: process.env.PGDATABASE || 'postgres',
      username: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD || 'postgres',
      entities: [UserEntity, OrganizationEntity, RoleEntity],
      synchronize: true,
    }),
  ],
  providers: [Unique, Exists],
})
export class DbModule {}
