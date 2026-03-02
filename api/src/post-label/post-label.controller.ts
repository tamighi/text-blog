import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { CreatePostLabelDto } from "./dto/create-post-label.dto";
import { PostLabelService } from "./post-label.service";

@Controller("post-labels")
export class PostLabelController {
  constructor(private readonly service: PostLabelService) {}

  @Post()
  create(@Body() dto: CreatePostLabelDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Delete(":postId/:labelId")
  remove(
    @Param("postId", ParseIntPipe) postId: number,
    @Param("labelId", ParseIntPipe) labelId: number,
  ) {
    return this.service.remove(postId, labelId);
  }
}
