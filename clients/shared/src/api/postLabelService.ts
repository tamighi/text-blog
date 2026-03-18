import type { CreatePostLabelDto, PostLabel, UpdatePostLabelDto } from "../types/postLabel";
import { BaseApi } from "./baseApi";
import { http } from "./http";

export class PostLabelApi extends BaseApi {
  list(query: {} = {}): Promise<PostLabel[]> {
    const qs = this.queryToSearchParams(query);
    return http<PostLabel[]>(`${this.base}/post-labels?${qs}`);
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
}

export const postLabelService = new PostLabelApi("http://localhost:3000");
