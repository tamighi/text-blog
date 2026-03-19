import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  IsArray,
  ArrayNotEmpty,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateHighlightDto {
  @ApiProperty()
  @IsInt()
  @Min(0)
  start: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  length: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  comment?: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  postId: number;

  @ApiProperty({ type: [Number] })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Min(1, { each: true })
  @Type(() => Number)
  labelIds: number[];
}
