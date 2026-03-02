import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsInt, IsOptional, Min, ArrayMinSize } from "class-validator";

export class CreateConceptDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  parentId?: number;

  @ApiProperty({ type: [Number] })
  @IsArray()
  @ArrayMinSize(1)
  @IsInt({ each: true })
  @Min(1, { each: true })
  labelIds: number[];
}
