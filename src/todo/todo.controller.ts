import {
  Controller,
  Get,
  Delete,
  Put,
  Post,
  Param,
  Body,
  Query,
  Request,
} from '@nestjs/common';
import { AddTodoDTO } from './dto/add-todo.dto';
import { EditTodoDTO } from './dto/edit-todo.dto';
import { TodoService } from './todo.service';
import { Todo, TodoStatusEnum } from './entities/todo.entity';
import { symlink } from 'fs';
import { TodoQueryParamsDTO } from './dto/todo-query-params.dto';
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Get('counts')
  async getTodoCountsByStatus(): Promise<{ [key in TodoStatusEnum]: number }> {
    return await this.todoService.getTodoCountsByStatus();
  }
  @Get()
  async getTodos(@Query() queryParams: TodoQueryParamsDTO): Promise<Todo[]> { 
    const { chaine, statut,page,limit } = queryParams;
    console.log('get Todos');
    return await this.todoService.getTodos(chaine, statut,page,limit);
  }

  @Post()
  addTodo(@Body() newTodo: AddTodoDTO): Promise<Todo> {
    return this.todoService.addTodo(newTodo);
  }

  @Get(':id')
  getTodoById(@Param('id') id) {
    return this.todoService.getTodoById(id);
  }

  @Delete(':id')
  async deleteTodoById(@Param('id') id,@Body() {userId}) {
    
    return await this.todoService.soft_deleteTodoById(id,userId);
  }

  @Put(':id')
  async editTodo(@Param('id') id, @Body() newTodo: Partial<EditTodoDTO>) {
    console.log('edit router');
    return await this.todoService.editTodo(id, newTodo);
  }
}
