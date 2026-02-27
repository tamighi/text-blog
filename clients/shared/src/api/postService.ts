import type { CreatePostDto, Post, UpdatePostDto } from "../types/post";
import { http } from "./http";

type PostsApiConfig = {
  baseUrl: string;
};

function createPostsApi(cfg: PostsApiConfig) {
  const base = cfg.baseUrl.replace(/\/$/, "");

  return {
    list(): Promise<Post[]> {
      return http<Post[]>(`${base}/post`);
    },

    create(dto: CreatePostDto): Promise<Post> {
      return http<Post>(`${base}/post`, {
        method: "POST",
        body: JSON.stringify(dto),
      });
    },

    get(id: string): Promise<Post> {
      return http<Post>(`${base}/post/${id}`);
    },

    update(id: string, dto: UpdatePostDto): Promise<Post> {
      return http<Post>(`${base}/post/${id}`, {
        method: "PATCH",
        body: JSON.stringify(dto),
      });
    },

    remove(id: string): Promise<{ id: string }> {
      return http<{ id: string }>(`${base}/post/${id}`, {
        method: "DELETE",
      });
    },
  };
}

export const postService = createPostsApi({
  baseUrl: "http://localhost:3000"
});
