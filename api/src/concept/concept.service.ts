import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateConceptDto } from "./dto/create-concept.dto";
import { UpdateConceptDto } from "./dto/update-concept.dto";

@Injectable()
export class ConceptService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateConceptDto) {
    if (!dto.labelIds?.length) {
      throw new BadRequestException("Concept must have at least one label");
    }

    return this.prisma.concept.create({
      data: {
        parentId: dto.parentId,
        labels: {
          connect: dto.labelIds.map((id) => ({ id })),
        },
      },
      include: { labels: true, children: true },
    });
  }

  async update(id: number, dto: UpdateConceptDto) {
    return this.prisma.concept.update({
      where: { id },
      data: {
        parentId: dto.parentId,
        ...(dto.labelIds && {
          labels: {
            set: dto.labelIds.map((id) => ({ id })),
          },
        }),
      },
      include: { labels: true, children: true },
    });
  }

  findAll() {
    return this.prisma.concept.findMany({
      include: { labels: true, children: true, parent: true },
    });
  }

  findOne(id: number) {
    return this.prisma.concept.findUnique({
      where: { id },
      include: { labels: true, children: true, parent: true },
    });
  }

  remove(id: number) {
    return this.prisma.concept.delete({
      where: { id },
    });
  }
}
