import type { CreatePostDto, Post, UpdatePostDto } from "../types/post";
import { BaseApi } from "./baseApi";
import { http } from "./http";

class PostsApi extends BaseApi {
  list(): Promise<Post[]> {
    return http<Post[]>(`${this.base}/post`);
  }

  create(dto: CreatePostDto): Promise<Post> {
    return http<Post>(`${this.base}/post`, {
      method: "POST",
      body: JSON.stringify(dto),
    });
  }

  get(id: number): Promise<Post> {
    return http<Post>(`${this.base}/post/${id}`);
  }

  update(id: number, dto: UpdatePostDto): Promise<Post> {
    return http<Post>(`${this.base}/post/${id}`, {
      method: "PATCH",
      body: JSON.stringify(dto),
    });
  }

  remove(id: number): Promise<{ id: string }> {
    return http<{ id: string }>(`${this.base}/post/${id}`, {
      method: "DELETE",
    });
  }

}

export const postService = new PostsApi("http://localhost:3000");
