import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleEntityRepository: Repository<RoleEntity>,
  ) {}

  findByIds(ids: number[]): Promise<RoleEntity[]> {
    return this.roleEntityRepository.findByIds(ids);
  }
}
