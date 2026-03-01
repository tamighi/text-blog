import type { CreatePostDto, Post, UpdatePostDto } from "../types/post";
import { http } from "./http";

interface PostsApiConfig {
  baseUrl: string;
}

class PostsApi {
  private base: string;

  constructor(cfg: PostsApiConfig) {
    this.base = cfg.baseUrl.replace(/\/$/, "");
  }

  list(): Promise<Post[]> {
    return http<Post[]>(`${this.base}/post`);
  }

  create(dto: CreatePostDto): Promise<Post> {
    return http<Post>(`${this.base}/post`, {
      method: "POST",
      body: JSON.stringify(dto),
    });
  }

  get(id: string): Promise<Post> {
    return http<Post>(`${this.base}/post/${id}`);
  }

  update(id: string, dto: UpdatePostDto): Promise<Post> {
    return http<Post>(`${this.base}/post/${id}`, {
      method: "PATCH",
      body: JSON.stringify(dto),
    });
  }

  remove(id: string): Promise<{ id: string }> {
    return http<{ id: string }>(`${this.base}/post/${id}`, {
      method: "DELETE",
    });
  }
}

export const postService = new PostsApi({
  baseUrl: "http://localhost:3000",
});
