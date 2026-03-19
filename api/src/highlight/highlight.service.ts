import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateHighlightDto } from "./dto/create-highlight.dto";
import { UpdateHighlightDto } from "./dto/update-highlight.dto";

@Injectable()
export class HighlightService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateHighlightDto) {
    const { labelIds, postId, ...data } = dto;

    return this.prisma.highlight.create({
      data: {
        ...data,
        post: {
          connect: { id: postId },
        },
        labels: {
          connect: labelIds.map((id) => ({ id })),
        },
      },
    });
  }

  findAll() {
    return this.prisma.highlight.findMany({
      include: {
        labels: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.highlight.findUnique({
      where: { id },
      include: {
        labels: true,
      },
    });
  }

  update(id: number, dto: UpdateHighlightDto) {
    const { labelIds, ...data } = dto;

    return this.prisma.highlight.update({
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
    return this.prisma.highlight.delete({
      where: { id },
    });
  }
}
