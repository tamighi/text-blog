import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { LocalizedTextDto } from "./dto/localized-text.dto";
import { Lang } from "src/generated/prisma/enums";

@Injectable()
export class LocalizedTextService {
  constructor(private prisma: PrismaService) {}

  async upsert(translatedTextId: number, dto: LocalizedTextDto) {
    const { content, language = Lang.EN } = dto;

    return this.prisma.localizedText.upsert({
      where: {
        translatedTextId_language: {
          translatedTextId,
          language,
        },
      },
      update: { content },
      create: {
        translatedTextId,
        language,
        content,
      },
    });
  }
}
