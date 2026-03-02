import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { HighlightService } from "./highlight.service";
import { CreateHighlightDto } from "./dto/create-highlight.dto";
import { UpdateHighlightDto } from "./dto/update-highlight.dto";

@ApiTags("highlights")
@Controller("highlights")
export class HighlightController {
  constructor(private readonly highlightService: HighlightService) {}

  @Post()
  create(@Body() dto: CreateHighlightDto) {
    return this.highlightService.create(dto);
  }

  @Get()
  findAll() {
    return this.highlightService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.highlightService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateHighlightDto,
  ) {
    return this.highlightService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.highlightService.remove(id);
  }
}
