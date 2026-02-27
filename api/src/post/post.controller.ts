import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostService } from "./post.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { memoryStorage } from "multer";
import { ImportWrittingsService } from "./import-writings.service";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";

@Controller("post")
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly importWrittingsService: ImportWrittingsService,
  ) {}

  @Post()
  create(@Body() body: CreatePostDto) {
    return this.postService.create(body);
  }

  @Get()
  list() {
    return this.postService.list();
  }

  @Post("import-zip")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: memoryStorage(),
      limits: { fileSize: 50 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        const ok =
          file.mimetype === "application/zip" ||
          file.mimetype === "application/x-zip-compressed" ||
          file.originalname.toLowerCase().endsWith(".zip");
        cb(ok ? null : new Error("Only .zip files are allowed"), ok);
      },
    }),
  )
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: { type: "string", format: "binary" },
      },
      required: ["file"],
    },
  })
  importZip(@UploadedFile() file: Express.Multer.File) {
    return this.importWrittingsService.importFromZip(file);
  }
}
