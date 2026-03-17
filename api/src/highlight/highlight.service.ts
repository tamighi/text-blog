import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateHighlightDto } from "./dto/create-highlight.dto";
import { UpdateHighlightDto } from "./dto/update-highlight.dto";
import { TranslatedTextService } from "src/text/translated-text.service";

@Injectable()
export class HighlightService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly translatedTextService: TranslatedTextService,
  ) {}

  async create(dto: CreateHighlightDto) {
    const { language, comment, ...data } = dto;

    const textDto = comment ? { content: comment, language } : undefined;
    const text = await this.translatedTextService.create(textDto);

    return this.prisma.highlight.create({
      data: { ...data, commentId: text.id },
    });
  }

  findAll() {
    return this.prisma.highlight.findMany();
  }

  findOne(id: number) {
    return this.prisma.highlight.findUnique({
      where: { id },
    });
  }

  async update(id: number, dto: UpdateHighlightDto) {
    const { comment, language, ...data } = dto;

    const highlight = await this.prisma.highlight.findUniqueOrThrow({
      where: { id },
    });

    if (comment) {
      await this.translatedTextService.update(highlight.commentId, {
        language,
        content: comment,
      });
    }

    return this.prisma.highlight.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.highlight.delete({
      where: { id },
    });
  }
}
