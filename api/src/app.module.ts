import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { TextModule } from "./post/post.module";

@Module({
  imports: [PrismaModule, TextModule],
})
export class AppModule {}
