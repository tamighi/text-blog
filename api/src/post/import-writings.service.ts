import { Injectable } from "@nestjs/common";
import * as path from "node:path";
import * as unzipper from "unzipper";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ImportWrittingsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Imports all .md files found in a zip upload.
   * Title derived from first H1 (# ...) or filename.
   */
  async importFromZip(file: Express.Multer.File) {
    if (!file?.buffer?.length) throw new Error("Missing zip file");

    // Parse zip from memory buffer
    const directory = await unzipper.Open.buffer(file.buffer);

    // Read all .md files (skip directories)
    const mdEntries = directory.files.filter(
      (f) => f.type === "File" && f.path.toLowerCase().endsWith(".md"),
    );

    const items = await Promise.all(
      mdEntries.map(async (entry) => {
        const buf = await entry.buffer();
        const content = buf.toString("utf8");

        const title =
          this.extractTitle(content) ?? this.filenameTitle(entry.path);

        return {
          title,
          content,
        };
      }),
    );

    const created = await this.prisma.$transaction(
      items.map((data) => this.prisma.post.create({ data: data as any })),
    );

    return {
      imported: created.length,
      files: mdEntries.length,
    };
  }

  private extractTitle(md: string): string | null {
    for (const line of md.split(/\r?\n/)) {
      const m = line.match(/^#\s+(.+?)\s*$/);
      if (m?.[1]) return m[1].trim();
    }
    return null;
  }

  private filenameTitle(entryPath: string): string {
    return path.basename(entryPath, path.extname(entryPath));
  }
}
