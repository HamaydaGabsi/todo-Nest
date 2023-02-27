import { TodoStatusEnum } from "../todoModel";
export class EditTodoDTO{
  name: string;
  description: string;
  statut : TodoStatusEnum
}