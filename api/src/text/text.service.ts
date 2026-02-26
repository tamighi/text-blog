import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class TextService {
  constructor(private readonly prisma: PrismaService) {}

  create(content: string) {
    return this.prisma.text.create({ data: { content } });
  }

  list() {
    return this.prisma.text.findMany({ orderBy: { id: "desc" } });
  }
}
