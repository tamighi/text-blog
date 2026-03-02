import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Min } from "class-validator";

export class CreatePostLabelDto {
  @ApiProperty()
  @IsInt()
  @Min(1)
  postId: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  labelId: number;
}
