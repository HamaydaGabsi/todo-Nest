import {
  Controller,
  Get,
  Delete,
  Put,
  Post,
  Param,
  Body,
} from '@nestjs/common';
import { AddTodoDTO } from './dto/add-todo.dto';
import { EditTodoDTO } from './dto/edit-todo.dto';
import { Todo, TodoStatusEnum } from './todoModel';
@Controller('todo')
export class TodoController {
  constructor() {
    this.listeTodos = [];
  }

  listeTodos: Todo[];

  @Get()
  getTodos() {
    console.log('get Todos');
    return this.listeTodos;
  }

  @Post()
  addTodo(@Body() newTodo:AddTodoDTO) {
    const todo=new Todo(newTodo.name,newTodo.description)
    this.listeTodos.push(todo);
    console.log("post" + todo)
    return(todo)
  }

  @Get(':id')
  getTodoById(@Param('id') id) {
    this.listeTodos.forEach((todo) => {
      if (id === todo.id){
        
        console.log(todo)
        return todo};
    });

  }

  @Delete(':id')
  deleteTodoById(@Param('id') id) {
    this.listeTodos = this.listeTodos.filter((todo) => {
      console.log('deleted')
      return todo.id !== id;
    });
  }

  @Put(':id')
  editTodo(@Param('id') id, @Body() newTodo: Partial<EditTodoDTO>) {
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
