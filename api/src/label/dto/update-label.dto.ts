import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { Lang } from "src/generated/prisma/enums";

export class UpdateLabelDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  color?: string;

  @ApiPropertyOptional({ enum: Lang })
  @IsOptional()
  @IsEnum(Lang)
  language?: Lang;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  conceptId?: number;
}
