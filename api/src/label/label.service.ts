import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateLabelDto } from "./dto/create-label.dto";
import { UpdateLabelDto } from "./dto/update-label.dto";

@Injectable()
export class LabelService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateLabelDto) {
    return this.prisma.label.create({ data: dto });
  }

  findAll() {
    return this.prisma.label.findMany();
  }

  findOne(id: number) {
    return this.prisma.label.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateLabelDto) {
    return this.prisma.label.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.label.delete({ where: { id } });
  }
}
