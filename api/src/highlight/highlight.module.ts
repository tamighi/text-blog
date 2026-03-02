import { Module } from "@nestjs/common";
import { HighlightController } from "./highlight.controller";
import { HighlightService } from "./highlight.service";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  controllers: [HighlightController],
  providers: [HighlightService, PrismaService],
})
export class HighlightModule {}
