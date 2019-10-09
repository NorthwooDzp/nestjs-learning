import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';

import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {
    }

    @Get()
    private getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
        return Object.keys(filterDto).length
            ?
            this.tasksService.getTasksWithFilters(filterDto)
            :
            this.tasksService.getAllTasks();
    }

    @Get('/:id')
    private getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    private createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete('/:id')
    private deleteTask(@Param('id') id: string): void {
        this.tasksService.deleteTask(id);
    }

    @Patch('/:id/status')
    private updateTaskStatus(@Param('id') id: string,
                             @Body('status') status: TaskStatus): Task {
        return this.tasksService.updateTaskStatus(id, status);
    }
}
