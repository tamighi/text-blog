import { Module } from "@nestjs/common";
import { HighlightModule } from "./highlight/highlight.module";
import { LabelModule } from "./label/label.module";
import { PostLabelModule } from "./post-label/post-label.module";
import { PostModule } from "./post/post.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [
    PrismaModule,
    PostModule,
    LabelModule,
    HighlightModule,
    PostLabelModule,
  ],
})
export class AppModule {}
