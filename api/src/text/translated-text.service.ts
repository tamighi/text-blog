import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { LocalizedTextDto } from "./dto/localized-text.dto";
import { LocalizedTextService } from "./localized-text.service";

@Injectable()
export class TranslatedTextService {
  constructor(
    private prisma: PrismaService,
    private localizedTextService: LocalizedTextService,
  ) {}

  async create(dto: LocalizedTextDto) {
    const translatedText = await this.prisma.translatedText.create({
      data: {},
    });

    await this.localizedTextService.upsert(translatedText.id, dto);

    return translatedText;
  }

  update(translatedTextId: number, dto: LocalizedTextDto) {
    return this.localizedTextService.upsert(translatedTextId, dto);
  }
}
