import { Injectable } from "@nestjs/common";
import { PostInclude } from "src/generated/prisma/models";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreatePostDto) {
    const { labelIds, ...data } = dto;

    return this.prisma.post.create({
      data: {
        ...data,
        ...(labelIds && {
          labels: {
            connect: labelIds.map((id) => ({ id })),
          },
        }),
      },
    });
  }

  findAll() {
    const include: PostInclude = {
      labels: true,
      highlights: { include: { labels: true } },
    };

    return this.prisma.post.findMany({ include });
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({
      where: { id },
    });
  }

  update(id: number, dto: UpdatePostDto) {
    const { labelIds, ...data } = dto;

    return this.prisma.post.update({
      where: { id },
      data: {
        ...data,
        ...(labelIds && {
          labels: {
            set: labelIds.map((id) => ({ id })),
          },
        }),
      },
    });
  }

  remove(id: number) {
    return this.prisma.post.delete({ where: { id } });
  }
}
