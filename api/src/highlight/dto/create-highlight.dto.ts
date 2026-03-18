import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, MaxLength, Min } from "class-validator";

export class CreateHighlightDto {
  @ApiProperty()
  @IsInt()
  @Min(0)
  start: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  length: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  comment?: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  postId: number;
}
