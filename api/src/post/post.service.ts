import { Injectable } from "@nestjs/common";
import { PostInclude } from "src/generated/prisma/models";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostQueryDto } from "./dto/post-query.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreatePostDto) {
    return this.prisma.post.create({ data: dto });
  }

  findAll(query: PostQueryDto = {}) {
    const include: PostInclude | undefined = {
      ...(query.includeLabels
        ? {
            postLabels: {
              include: { label: true },
            },
          }
        : {}),
    };

    return this.prisma.post.findMany({ include });
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({
      where: { id },
    });
  }

  update(id: number, dto: UpdatePostDto) {
    return this.prisma.post.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.post.delete({ where: { id } });
  }
}
