import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserEntity } from '../users/user.entity';

@Entity('organizations')
export class OrganizationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany(
    () => UserEntity,
    u => u.organizationId,
  )
  users: UserEntity;

  constructor(partial?: Partial<OrganizationEntity>) {
    Object.assign(this, partial);
  }
}
