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
import { CreatePostLabelDto } from "./dto/create-post-label.dto";
import { PostLabelService } from "./post-label.service";
import { UpdatePostLabelDto } from "./dto/update-post-label.dto";

@Controller("post-labels")
export class PostLabelController {
  constructor(private readonly postLabelService: PostLabelService) {}

  @Post()
  create(@Body() dto: CreatePostLabelDto) {
    return this.postLabelService.create(dto);
  }

  @Get()
  findAll() {
    return this.postLabelService.findAll();
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdatePostLabelDto,
  ) {
    return this.postLabelService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.postLabelService.remove(id);
  }
}
