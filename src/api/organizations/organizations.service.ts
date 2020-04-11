import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationEntity } from './organization.entity';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(OrganizationEntity)
    private readonly organizationEntityRepository: Repository<
      OrganizationEntity
    >,
  ) {}

  async findOrCreate(name: string): Promise<OrganizationEntity> {
    const org = await this.organizationEntityRepository.findOne({ name });
    if (!org) {
      return this.organizationEntityRepository.save(
        new OrganizationEntity({ name }),
      );
    }

    return org;
  }
}
