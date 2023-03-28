import { IsOptional, IsString } from 'class-validator';

export class TodoQueryParamsDTO {
  @IsOptional()
  @IsString()
  chaine?: string;

  @IsOptional()
  @IsString()
  statut?: string;
}