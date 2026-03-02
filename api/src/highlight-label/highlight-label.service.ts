import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateHighlightLabelDto } from "./dto/create-highlight-label.dto";

@Injectable()
export class HighlightLabelService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateHighlightLabelDto) {
    return this.prisma.highlightLabel.create({
      data: dto,
    });
  }

  findAll() {
    return this.prisma.highlightLabel.findMany({
      include: { highlight: true, label: true },
    });
  }

  remove(highlightId: number, labelId: number) {
    return this.prisma.highlightLabel.delete({
      where: {
        highlightId_labelId: {
          highlightId,
          labelId,
        },
      },
    });
  }
}
