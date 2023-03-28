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
import { Todo, TodoStatusEnum } from './entities/todo.entity';
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {
    
  }
  @Get('counts')
  async getTodoCountsByStatus(): Promise<{ [key in TodoStatusEnum]: number }> {
    return await this.todoService.getTodoCountsByStatus();
  }
  @Get()
  async getTodos() {
    console.log('get Todos');
    return await this.todoService.getTodos();
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
  async deleteTodoById(@Param('id') id) {
    return await this.todoService.soft_deleteTodoById(id)
  }

  @Put(':id')
  async editTodo(@Param('id') id, @Body() newTodo: Partial<EditTodoDTO>) {
    console.log("edit router")
    return  await this.todoService.editTodo(id,newTodo)
  }
  
}
