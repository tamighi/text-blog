import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, MaxLength, Min } from "class-validator";
import { Translated } from "src/text/dto/translated.dto";

export class CreatePostLabelDto extends Translated {
  @ApiProperty()
  @IsInt()
  @Min(1)
  readonly postId: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  readonly labelId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  readonly comment?: string;
}
