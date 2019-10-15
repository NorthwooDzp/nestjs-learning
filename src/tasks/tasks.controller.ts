import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {
    }

    /*@Get()
    private getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
        return Object.keys(filterDto).length
            ?
            this.tasksService.getTasksWithFilters(filterDto)
            :
            this.tasksService.getAllTasks();
    }*/

    @Get('/:id')
    private getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return  this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    private createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }

    /*@Patch('/:id/status')
    private updateTaskStatus(@Param('id') id: string,
                             @Body('status', TaskStatusValidationPipe) status: TaskStatus): Task {
        return this.tasksService.updateTaskStatus(id, status);
    }*/

    @Delete('/:id')
    private deleteTask(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.deleteTask(id);
    }

}
