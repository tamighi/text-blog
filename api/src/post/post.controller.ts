import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostService } from "./post.service";

@Controller("post")
export class PostController {
  constructor(private readonly post: PostService) {}

  @Post()
  create(@Body() body: CreatePostDto) {
    return this.post.create(body);
  }

  @Get()
  list() {
    return this.post.list();
  }
}
