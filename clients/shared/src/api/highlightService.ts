import type { CreateHighlightDto, Highlight, UpdateHighlightDto } from "../types/highlight";
import { BaseApi } from "./baseApi";
import { http } from "./http";

class HighlightApi extends BaseApi {
  list(): Promise<Highlight[]> {
    return http<Highlight[]>(`${this.base}/highlights`);
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
}

export const highlightService = new HighlightApi("http://localhost:3000");
