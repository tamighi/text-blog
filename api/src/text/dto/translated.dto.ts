import { IsEnum, IsOptional } from "class-validator";
import { Lang } from "src/generated/prisma/enums";

export class Translated {
  @IsOptional()
  @IsEnum(Lang)
  language?: Lang;
}
