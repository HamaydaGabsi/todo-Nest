import { MinLength,IsNotEmpty, MaxLength } from "class-validator";
import { EMPTY_ERROR, TOO_LONG_ERROR, TOO_SHORT_ERROR } from "src/constants";

export class AddTodoDTO{

  @IsNotEmpty({message:EMPTY_ERROR('name')})
  @MinLength(3,{message:TOO_SHORT_ERROR('name',3)})
  @MaxLength(10,{message:TOO_LONG_ERROR('name',10)})
  name: string;


  @IsNotEmpty({message:EMPTY_ERROR('description')})
  @MinLength(10,{message:TOO_SHORT_ERROR('description',10)})
  description: string;
}