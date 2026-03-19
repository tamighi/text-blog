import type { CreateLabelDto, Label, UpdateLabelDto } from "../types/label";
import { BaseApi } from "./baseApi";
import { http } from "./http";

export class LabelsApi extends BaseApi {
  list(): Promise<Label[]> {
    return http<Label[]>(`${this.base}/labels?`);
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

export const labelService = new LabelsApi("http://localhost:3000");
