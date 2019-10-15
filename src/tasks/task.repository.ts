import { EntityRepository, Repository } from 'typeorm';

import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    public async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const {description, title} = createTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        return this.save(task);
    }

    public async getTaskById(id: number): Promise<Task> | undefined {
        return this.findOne(id);
    }

    public async removeTask(task: Task): Promise<Task> {
        return this.remove(task);
    }

}
