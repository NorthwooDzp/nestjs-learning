import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid/v1';

import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    public getAllTasks(): Task[] {
        return this.tasks;
    }

    public getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
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
    }

    public getTaskById(id: string): Task {
        return this.tasks.find(item => item.id === id);
    }

    public createTask(createTaskDto: CreateTaskDto): Task {
        const {description, title} = createTaskDto;

        const task: Task = {
            title,
            description,
            status: TaskStatus.OPEN,
            id: uuid()
        };

        this.tasks.push(task);
        return task;
    }

    public updateTaskStatus(id: string, status: TaskStatus): Task {
        const task: Task = this.getTaskById(id);
        task.status = status;
        return task;
    }

    public deleteTask(id: string): void {
        this.tasks = this.tasks.filter(item => item.id !== id);
    }
}
