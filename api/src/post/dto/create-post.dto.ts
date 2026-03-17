import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString, MaxLength } from "class-validator";
import { Lang } from "src/generated/prisma/enums";

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly content: string;

  @ApiPropertyOptional({ enum: Lang, default: Lang.EN })
  @IsOptional()
  @IsEnum(Lang)
  readonly language?: Lang;
}
