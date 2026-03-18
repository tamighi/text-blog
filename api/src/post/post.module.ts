import { Module } from "@nestjs/common";
import { ImportWrittingsService } from "./import-writings.service";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";

@Module({
  controllers: [PostController],
  providers: [PostService, ImportWrittingsService],
})
export class PostModule {}
