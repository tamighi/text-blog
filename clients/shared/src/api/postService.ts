import type { CreatePostDto, Post, UpdatePostDto } from "../types/post";
import { BaseApi } from "./baseApi";

interface PostsApiConfig {
  baseUrl: string;
}

class PostsApi extends BaseApi<Post, CreatePostDto, UpdatePostDto> {
  constructor(cfg: PostsApiConfig) {
    super({ baseUrl: cfg.baseUrl, resource: "post" });
  }
}

export const postService = new PostsApi({
  baseUrl: "http://localhost:3000",
});
