import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly content: string;
}
