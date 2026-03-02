import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HighlightLabelService } from "./highlight-label.service";
import { CreateHighlightLabelDto } from "./dto/create-highlight-label.dto";

@ApiTags("highlight-labels")
@Controller("highlight-labels")
export class HighlightLabelController {
  constructor(private readonly service: HighlightLabelService) {}

  @Post()
  create(@Body() dto: CreateHighlightLabelDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Delete(":highlightId/:labelId")
  remove(
    @Param("highlightId", ParseIntPipe) highlightId: number,
    @Param("labelId", ParseIntPipe) labelId: number,
  ) {
    return this.service.remove(highlightId, labelId);
  }
}
