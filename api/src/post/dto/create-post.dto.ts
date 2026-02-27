import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { Lang } from "src/generated/prisma/enums";

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly content: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(["EN", "FR"])
  readonly lang?: Lang;
}
