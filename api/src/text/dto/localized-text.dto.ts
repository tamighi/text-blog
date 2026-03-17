import { IsString, MaxLength } from "class-validator";
import { Translated } from "./translated.dto";

export class LocalizedTextDto extends Translated {
  @IsString()
  @MaxLength(255)
  content: string;
}
