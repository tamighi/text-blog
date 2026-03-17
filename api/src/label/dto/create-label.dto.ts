import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from "class-validator";
import { Lang } from "src/generated/prisma/enums";

export class CreateLabelDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  content: string;

  @ApiProperty()
  @IsString()
  @MaxLength(10)
  color: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  definition?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  conceptId?: number;
}
