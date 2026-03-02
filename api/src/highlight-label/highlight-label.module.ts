import { Module } from "@nestjs/common";
import { HighlightLabelController } from "./highlight-label.controller";
import { HighlightLabelService } from "./highlight-label.service";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  controllers: [HighlightLabelController],
  providers: [HighlightLabelService, PrismaService],
})
export class HighlightLabelModule {}
