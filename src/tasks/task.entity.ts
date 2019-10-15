import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';

@Entity()
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn() public id: number;
    @Column() public title: string;
    @Column() public description: string;
    @Column() public status: TaskStatus;
}
