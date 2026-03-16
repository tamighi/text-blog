import { Injectable } from "@nestjs/common";
import { Lang } from "src/generated/prisma/enums";
import { PostInclude } from "src/generated/prisma/models";
import { TranslatedTextService } from "src/text/translated-text.service";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostQueryDto } from "./dto/post-query.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@Injectable()
export class PostService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly translatedTextService: TranslatedTextService,
  ) {}

  async create(data: CreatePostDto) {
    const { language, title, content, ...dto } = data;

    const { id: titleId } = await this.translatedTextService.create({
      content: title,
      language,
    });
    const { id: contentId } = await this.translatedTextService.create({
      content: content,
      language,
    });

    return this.prisma.post.create({ data: { titleId, contentId, ...dto } });
  }

  findAll(query: PostQueryDto = {}) {
    const include: PostInclude | undefined = query.includeLabels
      ? {
          postLabels: {
            include: {
              label: true,
            },
          },
        }
      : undefined;

    return this.prisma.post.findMany({
      include,
    });
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({
      where: { id },
    });
  }

  async update(id: number, dto: UpdatePostDto) {
    const post = await this.prisma.post.findUniqueOrThrow({
      where: { id },
    });

    const { title, content, language, ...data } = dto;

    if (title) {
      await this.translatedTextService.update(post.titleId, {
        language,
        content: title,
      });
    }

    if (content) {
      await this.translatedTextService.update(post.contentId, {
        language,
        content: content,
      });
    }

    return this.prisma.post.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.post.delete({ where: { id } });
  }
}
