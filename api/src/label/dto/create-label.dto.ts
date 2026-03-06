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

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(10)
  color: string;

  @ApiProperty({ enum: Lang, default: Lang.EN })
  @IsEnum(Lang)
  language: Lang;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  conceptId?: number;
}
