import type { CreateConceptDto, Concept, UpdateConceptDto } from "../types/concept";
import { http } from "./http";

class ConceptApi {
  private base: string;

  constructor(baseUrl: string) {
    this.base = baseUrl.replace(/\/$/, "");
  }

  list(): Promise<Concept[]> {
    return http<Concept[]>(`${this.base}/concepts`);
  }

  create(dto: CreateConceptDto): Promise<Concept> {
    return http<Concept>(`${this.base}/concepts`, {
      method: "POST",
      body: JSON.stringify(dto),
    });
  }

  get(id: number): Promise<Concept> {
    return http<Concept>(`${this.base}/concepts/${id}`);
  }

  update(id: number, dto: UpdateConceptDto): Promise<Concept> {
    return http<Concept>(`${this.base}/concepts/${id}`, {
      method: "PATCH",
      body: JSON.stringify(dto),
    });
  }

  remove(id: number): Promise<{ id: number }> {
    return http<{ id: number }>(`${this.base}/concepts/${id}`, {
      method: "DELETE",
    });
  }
}

export const conceptService = new ConceptApi("http://localhost:3000");
