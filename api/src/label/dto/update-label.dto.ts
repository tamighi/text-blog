import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, MaxLength, Min } from "class-validator";
import { Translated } from "src/text/dto/translated.dto";

export class UpdateLabelDto extends Translated {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  content?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(50)
  color?: string;

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
