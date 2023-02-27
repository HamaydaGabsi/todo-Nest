import { Controller,Get } from '@nestjs/common';
import {Todo,TodoStatusEnum} from './todoModel'
@Controller('todo')
export class TodoController {
  constructor(){
    this.listeTodos=[];
  }
  
  listeTodos : Todo[] 

  @Get()
  getTodos(){
    console.log('get Todos');
    return this.listeTodos
    
  }
  

  addTodo(name,description){
    this.listeTodos.push(new Todo(name,description))
  }

  getTodoById(id){
    this.listeTodos.forEach(todo => {
      if(id==todo.id)
      return todo
    });
  }
  deleteTodoById(id){
    this.listeTodos= this.listeTodos.filter(todo => {return todo.id !== id});
  }
  editTodo(newTodo){
    this.listeTodos.forEach(todo => {
      if(newTodo.id==todo.id){
        todo=newTodo;
        return
      }
    });
  }
}
