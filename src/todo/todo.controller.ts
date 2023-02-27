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
import { TodoService } from './todo.service';
import { Todo, TodoStatusEnum } from './todoModel';
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {
    
  }

  @Get()
  getTodos() {
    console.log('get Todos');
    return this.todoService.getTodos();
  }

  @Post()
  addTodo(@Body() newTodo:AddTodoDTO){
    return this.todoService.addTodo(newTodo)
  }

  
  @Get(':id')
  getTodoById(@Param('id') id) {
   return this.todoService.getTodoById(id)
  }

  @Delete(':id')
  deleteTodoById(@Param('id') id) {
    return this.todoService.deleteTodoById(id)
  }

  @Put(':id')
  editTodo(@Param('id') id, @Body() newTodo: Partial<EditTodoDTO>) {
    this.todoService.editTodo(id,newTodo)
  }
}
