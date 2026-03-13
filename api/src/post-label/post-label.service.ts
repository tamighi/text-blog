import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePostLabelDto } from "./dto/create-post-label.dto";
import { UpdatePostLabelDto } from "./dto/update-post-label.dto";

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

  update(id: number, data: UpdatePostLabelDto) {
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
