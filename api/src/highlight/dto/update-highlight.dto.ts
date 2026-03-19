import { ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  IsArray,
} from "class-validator";
import { Type } from "class-transformer";

export class UpdateHighlightDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(0)
  start?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  length?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  comment?: string;

  @ApiPropertyOptional({ type: [Number] })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Type(() => Number)
  labelIds?: number[];
}
