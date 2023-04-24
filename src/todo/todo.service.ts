import { Inject, Injectable,NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';



import { Repository } from 'typeorm';
import { AddTodoDTO } from './dto/add-todo.dto';
import { EditTodoDTO } from './dto/edit-todo.dto';
import { Todo, TodoStatusEnum } from './entities/todo.entity';
import { error } from 'console';

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
  async getTodos(chaine,statut,page,limit): Promise<Todo[]> {
    if(chaine ){
      console.log(chaine)
    }
    if(statut ){
      console.log(statut)
    }
    let queryBuilder = this.todoRepository.createQueryBuilder('todo');

    if (chaine) {
      queryBuilder = queryBuilder.where(`(LOWER(todo.name) LIKE LOWER(:chaine) OR LOWER(todo.description) LIKE LOWER(:chaine))`, { chaine: `%${chaine}%` });
    }

    if (statut) {
      queryBuilder = queryBuilder.andWhere('todo.statut = :statut', { statut });
    }
    if(parseInt(page)&&parseInt(limit)){
      const [todos, count] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return todos;
    }

    return await queryBuilder.getMany();
    
  }
  addTodo_L(newTodo: AddTodoDTO): Todo {
    const todo = new Todo(newTodo.name, newTodo.description,newTodo.userId);
    this.listeTodos.push(todo);
    console.log('post' + todo);
    return todo;
  }
  async addTodo(newTodo: AddTodoDTO): Promise<Todo> {
    console.log(newTodo)
    return await this.todoRepository.save(new Todo(newTodo.name,newTodo.description,newTodo.userId));

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
  async soft_deleteTodoById(id,userId) {
    const todo = await this.findTodoById(id)
    if(userId==todo.userId){
      return await this.todoRepository.softRemove(todo)
    }
    else {
      throw new UnauthorizedException("you are not authorized to delete this todo")
    }
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
    const aTodo = await this.todoRepository.update({'id':id,'userId':newTodo.userId},newTodo)
    if (aTodo.affected==0){
      throw new NotFoundException(`le todo d'id ${id} n'existe pas oubien tu n'as pas le droit de le modifier`)
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
