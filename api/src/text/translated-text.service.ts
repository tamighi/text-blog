import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { LocalizedTextDto } from "./dto/localized-text.dto";
import { LocalizedTextService } from "./localized-text.service";

@Injectable()
export class TranslatedTextService {
  public static readonly include = { include: { localizedTexts: true } };

  constructor(
    private prisma: PrismaService,
    private localizedTextService: LocalizedTextService,
  ) {}

  async create(dto?: LocalizedTextDto) {
    const translatedText = await this.prisma.translatedText.create({
      data: {},
    });

    if (dto) {
      await this.update(translatedText.id, dto);
    }

    return translatedText;
  }

  update(translatedTextId: number, dto: LocalizedTextDto) {
    return this.localizedTextService.upsert(translatedTextId, dto);
  }
}
