import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateLabelDto } from "./dto/create-label.dto";
import { UpdateLabelDto } from "./dto/update-label.dto";

@Injectable()
export class LabelService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateLabelDto) {
    return this.prisma.label.create({ data });
  }

  findAll() {
    return this.prisma.label.findMany();
  }

  findOne(id: number) {
    return this.prisma.label.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateLabelDto) {
    return this.prisma.label.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.label.delete({ where: { id } });
  }
}
