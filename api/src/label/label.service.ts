import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateLabelDto } from "./dto/create-label.dto";
import { UpdateLabelDto } from "./dto/update-label.dto";
import { LabelQueryDto } from "./dto/label-query.dto";
import { LabelWhereInput } from "src/generated/prisma/models";
import { TranslatedTextService } from "src/text/translated-text.service";

@Injectable()
export class LabelService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly translatedTextService: TranslatedTextService,
  ) {}

  async create(dto: CreateLabelDto) {
    const { language, definition, content, ...data } = dto;

    const { id: contentId } = await this.translatedTextService.create({
      content: content,
      language,
    });

    const definitionDto = definition
      ? { content: definition, language }
      : undefined;
    const { id: definitionId } =
      await this.translatedTextService.create(definitionDto);

    return this.prisma.label.create({
      data: { contentId, definitionId, ...data },
    });
  }

  findAll(query: LabelQueryDto = {}) {
    const where: LabelWhereInput | undefined = query.excludePostId
      ? {
          posts: { none: { postId: query.excludePostId } },
        }
      : undefined;

    return this.prisma.label.findMany({ where });
  }

  findOne(id: number) {
    return this.prisma.label.findUnique({ where: { id } });
  }

  async update(id: number, dto: UpdateLabelDto) {
    const { definition, content, language, ...data } = dto;

    const label = await this.prisma.label.findUniqueOrThrow({
      where: { id },
    });

    if (definition) {
      await this.translatedTextService.update(label.definitionId, {
        language,
        content: definition,
      });
    }

    if (content) {
      await this.translatedTextService.update(label.contentId, {
        language,
        content: content,
      });
    }

    return this.prisma.label.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.label.delete({ where: { id } });
  }
}
