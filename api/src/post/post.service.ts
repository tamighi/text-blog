import { Injectable } from "@nestjs/common";
import { PostCreateInput } from "src/generated/prisma/models";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: PostCreateInput) {
    return this.prisma.post.create({ data });
  }

  list() {
    return this.prisma.post.findMany({ orderBy: { id: "desc" } });
  }
}
