import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  constructor(partial?: Partial<RoleEntity>) {
    Object.assign(this, partial);
  }
}
