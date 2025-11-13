import { IsOptional, IsString } from 'class-validator';

export class FindAllTasksDto {
  @IsOptional()
  @IsString()
  isDone?: string;
}