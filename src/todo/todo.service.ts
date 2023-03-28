import { Inject, Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { AddTodoDTO } from './dto/add-todo.dto';
import { EditTodoDTO } from './dto/edit-todo.dto';
import { Todo, TodoStatusEnum } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @Inject('uuidProvider') uuid,
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {
    this.listeTodos = [];
  }
  listeTodos: Todo[];
  async findTodoById(id){
    const todo = await this.todoRepository.findOneBy({id})
    if(!todo){
      throw new NotFoundException(`le todo d'id ${id} n'existe pas`)
    }
    return todo
  }
  getTodos_L(): Todo[] {
    return this.listeTodos;
  }
  async getTodos(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }
  addTodo_L(newTodo: AddTodoDTO): Todo {
    const todo = new Todo(newTodo.name, newTodo.description);
    this.listeTodos.push(todo);
    console.log('post' + todo);
    return todo;
  }
  async addTodo(newTodo: AddTodoDTO): Promise<Todo> {
    console.log(newTodo)
    return await this.todoRepository.save(new Todo(newTodo.name,newTodo.description));
  }
  getTodoById(id) {
    this.listeTodos.forEach((todo) => {
      if (id === todo.id) {
        console.log(todo);
        return todo;
      }
    });
  }
  deleteTodoById_L(id) {
    this.listeTodos = this.listeTodos.filter((todo) => {
      console.log('deleted');
      return todo.id !== id;
    });
  }

  async deleteTodoById(id) {
    const todo = await this.findTodoById(id)
    return await this.todoRepository.remove(todo)
  }
  async soft_deleteTodoById(id) {
    const todo = await this.findTodoById(id)
    return await this.todoRepository.softRemove(todo)
  }

  editTodo_L(id, newTodo: Partial<EditTodoDTO>) {
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
  async editTodo(id, newTodo: Partial<EditTodoDTO>): Promise<Todo> {
    console.log('editing name')
    const aTodo = await this.todoRepository.update({'id':id},newTodo)
    if (aTodo.affected==0){
      throw new NotFoundException(`le todo d'id ${id} n'existe pas`)
    }
    return
  }
  async getTodoCountsByStatus(): Promise<{ [key in TodoStatusEnum]: number }> {
    console.log("into counts")
    const qb = this.todoRepository.createQueryBuilder('todo')
      .select('todo.statut', 'status')
      .addSelect('COUNT(todo.id)', 'count')
      .groupBy('todo.statut');

    const results = await qb.getRawMany();
    const counts = results.reduce((acc, { status, count }) => {
      acc[status] = count;
      return acc;
    }, {} as { [key in TodoStatusEnum]: number });
    console.log(counts)
    return counts;
  }
}
