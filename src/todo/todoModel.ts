import { v4 as uuidv4 } from 'uuid';
export class Todo{
  id : string
  name :string
  description :string
  dateCreation :Date
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