import { TaskStatus } from '../task.model';
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class GetTasksFilterDto {
    @IsOptional()
    @IsIn(Object.values(TaskStatus))
    public status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    public search: string;
}
