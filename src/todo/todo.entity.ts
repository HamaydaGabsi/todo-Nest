import { v4 as uuidv4 } from 'uuid';
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Todo{
  @PrimaryColumn()
  id : string
  @Column()
  name :string
  @Column()
  description :string
  @Column()
  dateCreation :Date
  @Column()
  statut : TodoStatusEnum
  constructor (name,description){
    this.id= uuidv4();
    this.name=name;
    this.description=description;
    this.dateCreation= new Date();
    this.statut= TodoStatusEnum.waiting;
  }
}
export enum TodoStatusEnum {
  'actif' = "En cours",
  'waiting' = "En attente",
  'done' = "Finalisé"
  }