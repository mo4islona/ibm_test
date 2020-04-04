import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserDto } from './user.dto';
import { OrganizationsService } from '../organizations/organizations.service';
import { RolesService } from '../roles/roles.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
    @Inject(OrganizationsService)
    private readonly organizationsService: OrganizationsService,
    @Inject(RolesService)
    private readonly rolesService: RolesService,
  ) {}

  async findOneElseThrow(
    id: string,
    relations?: string[],
  ): Promise<UserEntity> {
    const user = await this.userEntityRepository.findOne({
      where: { id },
      relations,
    });
    if (!user) throw new NotFoundException();

    return user;
  }

  findAll(): Promise<UserEntity[]> {
    return this.userEntityRepository.find({ relations: ['organization'] });
  }

  async addOne(req: UserDto): Promise<UserEntity> {
    const user = new UserEntity(req);

    const [org, roles] = await Promise.all([
      this.organizationsService.findOrCreate(req.organization),
      this.rolesService.findByIds(req.roles),
    ]);

    user.organization = org;
    user.roles = roles;

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    return this.userEntityRepository.save(user);
  }

  async remove(id: string): Promise<UserEntity> {
    const user = await this.findOneElseThrow(id, ['organization', 'roles']);
    await this.userEntityRepository.delete(user.id);

    return user;
  }
}
