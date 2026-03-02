import type { CreatePostLabelDto, PostLabel } from "../types/postLabel";
import { http } from "./http";

class PostLabelApi {
  private base: string;

  constructor(baseUrl: string) {
    this.base = baseUrl.replace(/\/$/, "");
  }

  list(): Promise<PostLabel[]> {
    return http<PostLabel[]>(`${this.base}/post-labels`);
  }

  create(dto: CreatePostLabelDto): Promise<PostLabel> {
    return http<PostLabel>(`${this.base}/post-labels`, {
      method: "POST",
      body: JSON.stringify(dto),
    });
  }

  remove(postId: number, labelId: number): Promise<{ postId: number; labelId: number }> {
    return http<{ postId: number; labelId: number }>(
      `${this.base}/post-labels/${postId}/${labelId}`,
      { method: "DELETE" },
    );
  }
}

export const postLabelService = new PostLabelApi("http://localhost:3000");
