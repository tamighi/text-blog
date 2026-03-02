import { Module } from "@nestjs/common";
import { PostLabelController } from "./post-label.controller";
import { PostLabelService } from "./post-label.service";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  controllers: [PostLabelController],
  providers: [PostLabelService, PrismaService],
})
export class PostLabelModule {}
