import { DeepPartial, EntityRepository,Repository } from "typeorm";
import { Todo } from "./todo.entity";
@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo>{
  createTodo =async (todo:Todo)=>{
    return await this.save(todo);
  }
  
}