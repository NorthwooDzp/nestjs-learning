import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

@Injectable()
export class TaskStatusValidationPipe implements PipeTransform {
  public transform(value: string) {
    if (!value) {
      throw new BadRequestException('Status is required parameter');
    }

    value = value.toLowerCase();

    if (!this.validateStatus(value)) {
      throw new BadRequestException(`Status ${value} is invalid`);
    }
    return value;
  }

  protected validateStatus(status: string): boolean {
    return Object.values(TaskStatus).includes(status);
  }
}
