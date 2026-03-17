import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";
import { Translated } from "src/text/dto/translated.dto";

export class CreatePostDto extends Translated {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly content: string;
}
