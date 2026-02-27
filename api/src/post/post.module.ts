import { Module } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { ImportWrittingsService } from "./import-writings.service";

@Module({
  controllers: [PostController],
  providers: [PostService, ImportWrittingsService],
})
export class TextModule {}
