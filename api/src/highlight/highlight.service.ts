import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateHighlightDto } from "./dto/create-highlight.dto";
import { UpdateHighlightDto } from "./dto/update-highlight.dto";

@Injectable()
export class HighlightService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateHighlightDto) {
    return this.prisma.highlight.create({ data: dto });
  }

  findAll() {
    return this.prisma.highlight.findMany();
  }

  findOne(id: number) {
    return this.prisma.highlight.findUnique({
      where: { id },
    });
  }

  update(id: number, dto: UpdateHighlightDto) {
    return this.prisma.highlight.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.highlight.delete({
      where: { id },
    });
  }
}
