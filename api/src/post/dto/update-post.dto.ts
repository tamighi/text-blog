import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class UpdatePostDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly content?: string;

  @ApiProperty({ type: [Number] })
  @IsArray()
  @IsInt({ each: true })
  readonly labelIds?: number[];
}
