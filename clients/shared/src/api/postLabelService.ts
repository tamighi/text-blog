import { Lang } from "../types/enums";
import { HighlightDto } from "../types/highlight";
import type { CreatePostLabelDto, PostLabel, PostLabelDto, UpdatePostLabelDto } from "../types/postLabel";
import { Translated } from "../types/text";
import { http } from "./http";
import { TextService } from "./textService";

class PostLabelApi extends BaseApi {
  async list(query: {} = {}, options: Translated = {}): Promise<PostLabel[]> {
    const qs = this.queryToSearchParams(query);
    const dtos = await http<PostLabelDto[]>(`${this.base}/post-labels?${qs}`);
    return dtos.map((dto) => this.dtoToInstance(dto, options.lang))
  }

  create(dto: CreatePostLabelDto): Promise<PostLabel> {
    return http<PostLabel>(`${this.base}/post-labels`, {
      method: "POST",
      body: JSON.stringify(dto),
    });
  }

  update(id: number, dto: UpdatePostLabelDto): Promise<PostLabel> {
    return http<PostLabel>(`${this.base}/post-labels/${id}`, {
      method: "PATCH",
      body: JSON.stringify(dto),
    });
  }

  remove(id: number) {
    return http<{ id: number }>(
      `${this.base}/post-labels/${id}`,
      { method: "DELETE" },
    );
  }

  private dtoToInstance(dto: PostLabelDto, lang: Lang = "EN"): PostLabel {
    return {
      ...dto,
      comment: TextService.getLocalizedText(dto.comment, lang) ?? "",
    }
  }
}

export const postLabelService = new PostLabelApi("http://localhost:3000");
