import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePostLabelDto } from "./dto/create-post-label.dto";

@Injectable()
export class PostLabelService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreatePostLabelDto) {
    return this.prisma.postLabel.create({
      data: dto,
    });
  }

  findAll() {
    return this.prisma.postLabel.findMany({
      include: { post: true, label: true },
    });
  }

  remove(postId: number, labelId: number) {
    return this.prisma.postLabel.delete({
      where: {
        postId_labelId: {
          postId,
          labelId,
        },
      },
    });
  }
}
