import { Module } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { ImportWrittingsService } from "./import-writings.service";
import { LocalizedTextService } from "src/text/localized-text.service";

@Module({
  controllers: [PostController],
  providers: [PostService, ImportWrittingsService, LocalizedTextService],
})
export class PostModule {}
