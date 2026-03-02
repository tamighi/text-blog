import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { Lang } from "src/generated/prisma/enums";

export class CreateLabelDto {
  @ApiProperty()
  @IsString()
  content: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  color?: string;

  @ApiProperty({ enum: Lang, default: Lang.EN })
  @IsEnum(Lang)
  language: Lang;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  conceptId?: number;
}
