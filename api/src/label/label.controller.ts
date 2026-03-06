import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { CreateLabelDto } from "./dto/create-label.dto";
import { UpdateLabelDto } from "./dto/update-label.dto";
import { LabelService } from "./label.service";
import { LabelQueryDto } from "./dto/label-query.dto";

@Controller("labels")
export class LabelController {
  constructor(private readonly labelService: LabelService) {}

  @Post()
  create(@Body() dto: CreateLabelDto) {
    return this.labelService.create(dto);
  }

  @Get()
  findAll(@Query() query: LabelQueryDto) {
    return this.labelService.findAll(query);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.labelService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateLabelDto) {
    return this.labelService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.labelService.remove(id);
  }
}
