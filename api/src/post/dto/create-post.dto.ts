import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, IsArray, IsInt } from "class-validator";

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly content: string;

  @ApiProperty({ type: [Number] })
  @IsArray()
  @IsInt({ each: true })
  readonly labelIds?: number[];
}
