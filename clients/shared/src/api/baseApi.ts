import { http } from "./http";

interface BaseApiConfig {
  baseUrl: string;
  resource: string;
}

export class BaseApi<T, CreateDto = T, UpdateDto = Partial<T>> {
  protected url: string;

  constructor(cfg: BaseApiConfig) {
    this.url = `${cfg.baseUrl.replace(/\/$/, "")}/${cfg.resource}`;
  }

  list(): Promise<T[]> {
    return http<T[]>(this.url);
  }

  create(dto: CreateDto): Promise<T> {
    return http<T>(this.url, {
      method: "POST",
      body: JSON.stringify(dto),
    });
  }

  get(id: string): Promise<T> {
    return http<T>(`${this.url}/${id}`);
  }

  update(id: string, dto: UpdateDto): Promise<T> {
    return http<T>(`${this.url}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(dto),
    });
  }

  remove(id: string): Promise<{ id: string }> {
    return http<{ id: string }>(`${this.url}/${id}`, {
      method: "DELETE",
    });
  }
}
