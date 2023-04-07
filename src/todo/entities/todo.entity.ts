import { v4 as uuidv4 } from 'uuid';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../utils/entities/BaseEntity.entity';
export enum TodoStatusEnum {
  'actif' = 'En cours',
  'waiting' = 'En attente',
  'done' = 'Finalisé',
}

@Entity('todo')
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column(
    {
      type:'enum',
      enum:TodoStatusEnum,
      default:TodoStatusEnum.waiting
    }
  )
  statut: TodoStatusEnum;
  @Column()
  userId: number

  constructor(name: string, description: string, userId:number) {
    super();
    this.name = name;
    this.description = description;
    this.statut = TodoStatusEnum.waiting;
    this.userId=userId
  }
}

