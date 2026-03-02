import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Min } from "class-validator";

export class CreateHighlightLabelDto {
  @ApiProperty()
  @IsInt()
  @Min(1)
  highlightId: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  labelId: number;
}
