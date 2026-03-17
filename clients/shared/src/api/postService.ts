import { Lang } from "../types/enums";
import type { CreatePostDto, OptionsPostDto, Post, PostDto, QueryPostDto, UpdatePostDto } from "../types/post";
import { http } from "./http";
import { TextService } from "./textService";

interface PostsApiConfig {
  baseUrl: string;
}

class PostsApi {
  private base: string;

  constructor(cfg: PostsApiConfig) {
    this.base = cfg.baseUrl.replace(/\/$/, "");
  }

  async list(query: QueryPostDto = {}, options: OptionsPostDto = {}): Promise<Post[]> {
    const searchParams = new URLSearchParams(
      Object.entries(query)
        .filter(([, v]) => v !== undefined && v !== null)
        .map(([k, v]) => [k, String(v)])
    );

    const qs = searchParams.toString();
    const postDtos = await http<PostDto[]>(`${this.base}/post?${qs}`);

    return postDtos.map((dto) => this.postDtoToPost(dto, options.lang))
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

  private postDtoToPost(dto: PostDto, lang: Lang = "EN"): Post {
    return {
      ...dto,
      content: TextService.getLocalizedText(dto.content, lang) ?? "",
      title: TextService.getLocalizedText(dto.title, lang) ?? ""
    }
  }
}

export const postService = new PostsApi({
  baseUrl: "http://localhost:3000",
});
