import { Module } from "@nestjs/common";
import { ConceptModule } from "./concept/concept.module";
import { HighlightLabelModule } from "./highlight-label/highlight-label.module";
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
    ConceptModule,
    HighlightLabelModule,
    PostLabelModule,
  ],
})
export class AppModule {}
