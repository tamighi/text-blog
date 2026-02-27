import { ApiProperty } from "@nestjs/swagger";
import { Lang } from "src/generated/prisma/enums";

export class CreatePostDto {
  @ApiProperty()
  readonly content: string;

  @ApiProperty()
  readonly lang: Lang;
}
