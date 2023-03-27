import { Inject, Injectable } from '@nestjs/common';
import { AddTodoDTO } from './dto/add-todo.dto';
import { EditTodoDTO } from './dto/edit-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(@Inject ('uuidProvider') uuid){
    this.listeTodos=[]
  }
  listeTodos: Todo[];
  getTodos(): Todo[]{
    return this.listeTodos;
  }
  addTodo(newTodo:AddTodoDTO):Todo {
    const todo=new Todo(newTodo.name,newTodo.description)
    this.listeTodos.push(todo);
    console.log("post" + todo)
    return(todo)
  }
  getTodoById(id) {
    this.listeTodos.forEach((todo) => {
      if (id === todo.id){
        
        console.log(todo)
        return todo};
    });
  }
  deleteTodoById(id) {
    this.listeTodos = this.listeTodos.filter((todo) => {
      console.log('deleted')
      return todo.id !== id;
    });
  }

  editTodo(id,newTodo: Partial<EditTodoDTO>) {
    this.listeTodos.forEach((todo) => {
      if (id === todo.id) {
        todo.description = newTodo.description
          ? newTodo.description
          : todo.description;
        todo.name = newTodo.name ? newTodo.name : todo.name;
        todo.description = newTodo.description
          ? newTodo.description
          : todo.description;
        todo.statut = newTodo.statut ? newTodo.statut : todo.statut;
        return todo;
      }
    });
  }
}
