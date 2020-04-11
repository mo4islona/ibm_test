import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
} from 'typeorm';
import { UserEntity } from '../users/user.entity';

@Entity('organizations')
export class OrganizationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ nullable: false })
  name: string;

  @OneToMany(() => UserEntity, (u) => u.organizationId)
  users: UserEntity;

  constructor(partial?: Partial<OrganizationEntity>) {
    Object.assign(this, partial);
  }
}
