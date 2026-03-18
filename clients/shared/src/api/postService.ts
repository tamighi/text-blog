import type { CreatePostDto, Post, QueryPostDto, UpdatePostDto } from "../types/post";
import { BaseApi } from "./baseApi";
import { http } from "./http";

class PostsApi extends BaseApi {
  list(query: QueryPostDto = {}): Promise<Post[]> {
    const qs = this.queryToSearchParams(query);
    return http<Post[]>(`${this.base}/post?${qs}`);
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

export const postService = new PostsApi("http://localhost:3000");
