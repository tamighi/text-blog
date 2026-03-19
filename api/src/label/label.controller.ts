import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { CreateLabelDto } from "./dto/create-label.dto";
import { UpdateLabelDto } from "./dto/update-label.dto";
import { LabelService } from "./label.service";

@Controller("labels")
export class LabelController {
  constructor(private readonly labelService: LabelService) {}

  @Post()
  create(@Body() dto: CreateLabelDto) {
    return this.labelService.create(dto);
  }

  @Get()
  findAll() {
    return this.labelService.findAll();
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
