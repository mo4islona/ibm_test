import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Index,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserDto } from './user.dto';
import { OrganizationEntity } from '../organizations/organization.entity';
import { RoleEntity } from '../roles/role.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: false })
  @Index({ unique: true })
  login: string;

  @Exclude()
  @Column({ nullable: false })
  password: string;

  @Exclude()
  @Column({ nullable: false })
  organizationId: number;

  @ManyToOne(() => OrganizationEntity, (o) => o.users)
  @JoinColumn()
  organization: OrganizationEntity;

  @ManyToMany(() => RoleEntity)
  @JoinTable({ name: 'users_role_relations' })
  roles: RoleEntity[];

  constructor(partial?: Partial<UserEntity | UserDto>) {
    Object.assign(this, partial);
  }
}

export enum UserEntityRelation {
  Roles = 'roles',
  Organization = 'organization',
}
