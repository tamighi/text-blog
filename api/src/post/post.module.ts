import { Module } from "@nestjs/common";
import { ImportWrittingsService } from "./import-writings.service";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { TextModule } from "src/text/text.module";

@Module({
  controllers: [PostController],
  providers: [PostService, ImportWrittingsService],
  imports: [TextModule],
})
export class PostModule {}
