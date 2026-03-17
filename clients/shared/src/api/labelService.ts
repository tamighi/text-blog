import { Lang } from "../types/enums";
import type { CreateLabelDto, Label, LabelDto, QueryLabelDto, UpdateLabelDto } from "../types/label";
import { Translated } from "../types/text";
import { http } from "./http";
import { TextService } from "./textService";

class LabelsApi extends BaseApi {
  async list(query: QueryLabelDto = {}, options: Translated = {}): Promise<Label[]> {
    const qs = this.queryToSearchParams(query);
    const dtos = await http<LabelDto[]>(`${this.base}/labels?${qs}`);
    return dtos.map((dto) => this.dtoToInstance(dto, options.lang))
  }

  create(dto: CreateLabelDto): Promise<Label> {
    return http<Label>(`${this.base}/labels`, {
      method: "POST",
      body: JSON.stringify(dto),
    });
  }

  get(id: number): Promise<Label> {
    return http<Label>(`${this.base}/labels/${id}`);
  }

  update(id: number, dto: UpdateLabelDto): Promise<Label> {
    return http<Label>(`${this.base}/labels/${id}`, {
      method: "PATCH",
      body: JSON.stringify(dto),
    });
  }

  remove(id: number): Promise<{ id: number }> {
    return http<{ id: number }>(`${this.base}/labels/${id}`, {
      method: "DELETE",
    });
  }

  private dtoToInstance(dto: LabelDto, lang: Lang = "EN"): Label {
    return {
      ...dto,
      definition: TextService.getLocalizedText(dto.definition, lang) ?? "",
      content: TextService.getLocalizedText(dto.content, lang) ?? "",
    }
  }
}

export const labelService = new LabelsApi("http://localhost:3000");
