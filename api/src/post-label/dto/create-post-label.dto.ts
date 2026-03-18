import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, MaxLength, Min } from "class-validator";

export class CreatePostLabelDto {
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
