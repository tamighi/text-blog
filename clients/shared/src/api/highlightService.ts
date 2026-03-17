import { Lang } from "../types/enums";
import type { CreateHighlightDto, Highlight, HighlightDto, UpdateHighlightDto } from "../types/highlight";
import { Translated } from "../types/text";
import { http } from "./http";
import { TextService } from "./textService";

class HighlightApi extends BaseApi {
  async list(query: {} = {}, options: Translated = {}): Promise<Highlight[]> {
    const qs = this.queryToSearchParams(query);
    const dtos = await http<HighlightDto[]>(`${this.base}/highlights?${qs}`);
    return dtos.map((dto) => this.dtoToInstance(dto, options.lang))
  }

  create(dto: CreateHighlightDto): Promise<Highlight> {
    return http<Highlight>(`${this.base}/highlights`, {
      method: "POST",
      body: JSON.stringify(dto),
    });
  }

  get(id: number): Promise<Highlight> {
    return http<Highlight>(`${this.base}/highlights/${id}`);
  }

  update(id: number, dto: UpdateHighlightDto): Promise<Highlight> {
    return http<Highlight>(`${this.base}/highlights/${id}`, {
      method: "PATCH",
      body: JSON.stringify(dto),
    });
  }

  remove(id: number): Promise<{ id: number }> {
    return http<{ id: number }>(`${this.base}/highlights/${id}`, {
      method: "DELETE",
    });
  }

  private dtoToInstance(dto: HighlightDto, lang: Lang = "EN"): Highlight {
    return {
      ...dto,
      comment: TextService.getLocalizedText(dto.comment, lang) ?? "",
    }
  }
}

export const highlightService = new HighlightApi("http://localhost:3000");
