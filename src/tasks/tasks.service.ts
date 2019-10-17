import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {
    }

    public async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto);
    }

    public async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.getTaskById(id);
        if (!found) {
            throw  new NotFoundException(`Task with ID ${id} not found`);
        }
        return found;
    }

    public async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto);
    }

    public async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        return this.taskRepository.updateTaskStatus(task, status);
    }

    public async deleteTask(id: number): Promise<Task> {
        const task = await this.getTaskById(id);
        return this.taskRepository.removeTask(task);
    }
}
