import type { CreateLabelDto, Label, QueryLabelDto, UpdateLabelDto } from "../types/label";
import { http } from "./http";

interface LabelsApiConfig {
  baseUrl: string;
}

class LabelsApi {
  private base: string;

  constructor(cfg: LabelsApiConfig) {
    this.base = cfg.baseUrl.replace(/\/$/, "");
  }

  list(query: QueryLabelDto = {}): Promise<Label[]> {
    const params = new URLSearchParams(
      Object.entries(query)
        .filter(([, v]) => v !== undefined && v !== null)
        .map(([k, v]) => [k, String(v)])
    );

    const qs = params.toString();
    return http<Label[]>(`${this.base}/labels?${qs}`);
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
}

export const labelService = new LabelsApi({ baseUrl: "http://localhost:3000" });
