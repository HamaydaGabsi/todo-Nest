import { MinLength,IsOptional, MaxLength ,IsEnum} from "class-validator";
import {
  STATUS_ENUM_ERROR,
  TOO_LONG_ERROR,
  TOO_SHORT_ERROR,
} from 'src/constants';
import { TodoStatusEnum } from '../todo.entity';
export class EditTodoDTO {
  @IsOptional()
  @MinLength(3, { message: TOO_SHORT_ERROR('name', 3) })
  @MaxLength(10, { message: TOO_LONG_ERROR('name', 10) })
  name: string;
  @IsOptional()
  @MinLength(10, { message: TOO_SHORT_ERROR('description', 10) })
  description: string;

  @IsOptional()
  @IsEnum(TodoStatusEnum, { message: STATUS_ENUM_ERROR })
  statut: TodoStatusEnum;
}
