import type { CreateHighlightLabelDto, HighlightLabel } from "../types/highlightLabel";
import { http } from "./http";

class HighlightLabelApi {
  private base: string;

  constructor(baseUrl: string) {
    this.base = baseUrl.replace(/\/$/, "");
  }

  list(): Promise<HighlightLabel[]> {
    return http<HighlightLabel[]>(`${this.base}/highlight-labels`);
  }

  create(dto: CreateHighlightLabelDto): Promise<HighlightLabel> {
    return http<HighlightLabel>(`${this.base}/highlight-labels`, {
      method: "POST",
      body: JSON.stringify(dto),
    });
  }

  remove(highlightId: number, labelId: number): Promise<{ highlightId: number; labelId: number }> {
    return http<{ highlightId: number; labelId: number }>(
      `${this.base}/highlight-labels/${highlightId}/${labelId}`,
      { method: "DELETE" },
    );
  }
}

export const highlightLabelService = new HighlightLabelApi("http://localhost:3000");
