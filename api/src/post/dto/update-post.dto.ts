import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength } from "class-validator";
import { Translated } from "src/text/dto/translated.dto";

export class UpdatePostDto extends Translated {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  readonly title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly content?: string;
}
