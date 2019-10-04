import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid/v1';

import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    public getAllTasks(): Task[] {
        return this.tasks;
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
            id: uuid(),
        };

        this.tasks.push(task);
        return task;
    }
}
