import { EntityRepository, Repository } from 'typeorm';

import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    public async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const {search, status} = filterDto;
        const query = this.createQueryBuilder('task');
        if (status) {
            query.andWhere('task.status = :status', {status});
        }

        if (search) {
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', {search: `%${search}%`});
        }

        query.orderBy('title');

        return query.getMany();
    }

    public async getTaskById(id: number): Promise<Task> | undefined {
        return this.findOne(id);
    }

    public async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const {description, title} = createTaskDto;
        const task = new Task(title, description);
        return this.save(task);
    }

    public async removeTask(task: Task): Promise<Task> {
        return this.remove(task);
    }

    public async updateTaskStatus(task: Task, status: TaskStatus): Promise<Task> {
        task.status = status;
        await this.save(task);
        return task;
    }

}
