import { IsEnum, IsOptional, IsString, MaxLength } from "class-validator";
import { Lang } from "src/generated/prisma/enums";

export class LocalizedTextDto {
  @IsString()
  @MaxLength(255)
  content: string;

  @IsOptional()
  @IsEnum(Lang)
  language?: Lang;
}
