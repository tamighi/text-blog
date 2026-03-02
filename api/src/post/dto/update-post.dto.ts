import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsOptional, IsString } from "class-validator";
import { Lang } from "src/generated/prisma/enums";

export class UpdatePostDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly content?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  readonly published?: boolean;

  @ApiPropertyOptional({ enum: Lang })
  @IsOptional()
  @IsEnum(Lang)
  readonly language?: Lang;
}
