import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationEntity } from './organization.entity';
import { OrganizationsService } from './organizations.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrganizationEntity])],
  providers: [OrganizationsService],
  controllers: [],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}
