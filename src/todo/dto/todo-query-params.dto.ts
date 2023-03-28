import {IsOptional, IsString } from 'class-validator';

export class TodoQueryParamsDTO {
  @IsOptional()
  @IsString()
  chaine?: string;

  @IsOptional()
  @IsString()
  statut?: string;

  @IsOptional()
  @IsString()
  page?: number;

  @IsOptional()
  @IsString()
  limit?: number;
}