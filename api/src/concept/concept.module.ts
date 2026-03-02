import { Module } from "@nestjs/common";
import { ConceptController } from "./concept.controller";
import { ConceptService } from "./concept.service";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  controllers: [ConceptController],
  providers: [ConceptService, PrismaService],
})
export class ConceptModule {}
