import { v4 as uuidv4 } from 'uuid';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../utils/entities/BaseEntity.entity';
@Entity('todo')
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  statut: TodoStatusEnum;

  constructor(name: string, description: string) {
    super();
    this.name = name;
    this.description = description;
    this.statut = TodoStatusEnum.waiting;
  }
}

export enum TodoStatusEnum {
  'actif' = 'En cours',
  'waiting' = 'En attente',
  'done' = 'Finalisé',
}
