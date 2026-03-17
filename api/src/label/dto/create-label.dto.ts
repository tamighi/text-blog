import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, MaxLength, Min } from "class-validator";
import { Translated } from "src/text/dto/translated.dto";

export class CreateLabelDto extends Translated {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  content: string;

  @ApiProperty()
  @IsString()
  @MaxLength(10)
  color: string;

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
