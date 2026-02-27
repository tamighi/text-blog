import { Body, Controller, Get, Post } from "@nestjs/common";
import { PostService } from "./post.service";
import { Lang } from "src/generated/prisma/enums";

@Controller("post")
export class PostController {
  constructor(private readonly post: PostService) {}

  @Post()
  create(@Body() body: { content: string; language?: Lang }) {
    return this.post.create(body);
  }

  @Get()
  list() {
    return this.post.list();
  }
}
