import { Injectable } from "@nestjs/common";
import { TranslatedTextService } from "src/text/translated-text.service";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePostLabelDto } from "./dto/create-post-label.dto";
import { UpdatePostLabelDto } from "./dto/update-post-label.dto";

@Injectable()
export class PostLabelService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly translatedTextService: TranslatedTextService,
  ) {}

  async create(dto: CreatePostLabelDto) {
    const { language, comment, ...data } = dto;

    const textDto = comment ? { content: comment, language } : undefined;
    const text = await this.translatedTextService.create(textDto);

    return this.prisma.postLabel.create({
      data: {
        ...data,
        commentId: text.id,
      },
    });
  }

  findAll() {
    return this.prisma.postLabel.findMany({
      include: {
        post: true,
        label: true,
        comment: TranslatedTextService.include,
      },
    });
  }

  async update(id: number, dto: UpdatePostLabelDto) {
    const { comment, language, ...data } = dto;

    const postLabel = await this.prisma.postLabel.findUniqueOrThrow({
      where: { id },
    });

    if (comment) {
      await this.translatedTextService.update(postLabel.commentId, {
        language,
        content: comment,
      });
    }

    return this.prisma.postLabel.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.postLabel.delete({
      where: {
        id,
      },
    });
  }
}
