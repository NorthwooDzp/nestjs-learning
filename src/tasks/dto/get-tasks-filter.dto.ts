import { TaskStatus } from '../task.model';

export class GetTasksFilterDto {
    public status: TaskStatus;
    public search: string;
}