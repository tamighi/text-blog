import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { TranslatedTextService } from "./translated-text.service";
import { LocalizedTextService } from "./localized-text.service";

@Module({
  providers: [PrismaService, TranslatedTextService, LocalizedTextService],
  exports: [TranslatedTextService, LocalizedTextService],
})
export class TextModule {}
