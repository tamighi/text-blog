import { Body, Controller, Get, Post } from "@nestjs/common";
import { TextService } from "./text.service";

@Controller("text")
export class TextController {
  constructor(private readonly text: TextService) {}

  @Post()
  create(@Body() body: { content: string }) {
    return this.text.create(body.content);
  }

  @Get()
  list() {
    return this.text.list();
  }
}
