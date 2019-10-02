import { Controller, Get, Req, Res } from '@nestjs/common';

import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {
    }

    @Get()
    private getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }
}
