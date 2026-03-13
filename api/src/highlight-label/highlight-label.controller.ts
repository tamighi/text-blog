import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { CreateHighlightLabelDto } from "./dto/create-highlight-label.dto";
import { HighlightLabelService } from "./highlight-label.service";

@Controller("highlight-labels")
export class HighlightLabelController {
  constructor(private readonly highlightLabelService: HighlightLabelService) {}

  @Post()
  create(@Body() dto: CreateHighlightLabelDto) {
    return this.highlightLabelService.create(dto);
  }

  @Get()
  findAll() {
    return this.highlightLabelService.findAll();
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.highlightLabelService.remove(id);
  }
}
