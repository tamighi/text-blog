import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { LabelService } from "./label.service";
import { LabelController } from "./label.controller";

@Module({
  controllers: [LabelController],
  providers: [LabelService, PrismaService],
})
export class LabelModule {}
