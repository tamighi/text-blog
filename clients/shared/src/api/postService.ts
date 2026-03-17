import { Lang } from "../types/enums";
import type { CreatePostDto, Post, PostDto, QueryPostDto, UpdatePostDto } from "../types/post";
import { Translated } from "../types/text";
import { http } from "./http";
import { TextService } from "./textService";

class PostsApi extends BaseApi {
  async list(query: QueryPostDto = {}, options: Translated = {}): Promise<Post[]> {
    const qs = this.queryToSearchParams(query);
    const dtos = await http<PostDto[]>(`${this.base}/post?${qs}`);
    return dtos.map((dto) => this.dtoToInstance(dto, options.lang))
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

  private dtoToInstance(dto: PostDto, lang: Lang = "EN"): Post {
    return {
      ...dto,
      content: TextService.getLocalizedText(dto.content, lang) ?? "",
      title: TextService.getLocalizedText(dto.title, lang) ?? ""
    }
  }
}

export const postService = new PostsApi("http://localhost:3000");
