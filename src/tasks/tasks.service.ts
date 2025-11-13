import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { FindAllTasksDto } from './dto/findall-tasks.dto'; import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  findAll(query: FindAllTasksDto): Promise<Task[]> {
    const findOptions: any = {
      order: {
        createdAt: 'DESC',
      },
    };

    if (query.isDone !== undefined) {
      findOptions.where = {
        isDone: query.isDone === 'true',
      };
    }

    return this.taskRepository.find(findOptions);
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ id: id });

    if (!task) {
      throw new NotFoundException(`Tarefa com ID "${id}" não encontrada.`);
    }
    return task;
  }


  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
 
    const task = await this.findOne(id); 

    task.title = updateTaskDto.title ?? task.title;
    task.description = updateTaskDto.description ?? task.description;
    task.isDone = updateTaskDto.isDone ?? task.isDone;
    
    return this.taskRepository.save(task);
  }

  async remove(id: string): Promise<Task> {

    const task = await this.findOne(id);
    return this.taskRepository.remove(task);

  }
}