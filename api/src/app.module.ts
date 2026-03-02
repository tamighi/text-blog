import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { TextModule } from "./post/post.module";
import { LabelModule } from "./label/label.module";

@Module({
  imports: [PrismaModule, TextModule, LabelModule],
})
export class AppModule {}
