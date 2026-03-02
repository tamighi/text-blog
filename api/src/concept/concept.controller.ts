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
import { ConceptService } from "./concept.service";
import { CreateConceptDto } from "./dto/create-concept.dto";
import { UpdateConceptDto } from "./dto/update-concept.dto";

@Controller("concepts")
export class ConceptController {
  constructor(private readonly conceptService: ConceptService) {}

  @Post()
  create(@Body() dto: CreateConceptDto) {
    return this.conceptService.create(dto);
  }

  @Get()
  findAll() {
    return this.conceptService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.conceptService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateConceptDto) {
    return this.conceptService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.conceptService.remove(id);
  }
}
