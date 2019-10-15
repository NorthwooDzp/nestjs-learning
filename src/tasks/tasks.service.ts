import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) {
    }

    public async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if (!found) {
            throw  new NotFoundException(`Task with ID ${id} not found`);
        }
        return found;
    }

     /*public getAllTasks(): Task[] {
         return this.tasks;
     }*/

    /* public getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
         const {search, status} = filterDto;

         let tasks = this.getAllTasks();

         if (status) {
             tasks = tasks.filter(item => item.status === status);
         }
         if (search) {
             tasks = tasks.filter(item =>
                 item.description.includes(search) ||
                 item.title.includes(search));
         }

         return tasks;
     }*/

     public createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
     }

     /*public updateTaskStatus(id: string, status: TaskStatus): Task {
         console.log(status);
         const task: Task = this.getTaskById(id);
         task.status = status;
         return task;
     }*/

     /*public deleteTask(id: string): void {
         this.getTaskById(id);
         this.tasks = this.tasks.filter(item => item.id !== id);
     }*/
}
