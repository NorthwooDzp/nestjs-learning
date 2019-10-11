
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class GetTasksFilterDto {
    @IsOptional()
    @IsIn(Object.values(TaskStatus))
    public status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    public search: string;
}
