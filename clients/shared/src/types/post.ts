import type { Lang } from "./enums";
import { PostLabel } from "./postLabel";

export interface Post {
  id: number;
  title: string;
  content: string;
  published: boolean;
  language: Lang;
  createdAt: string;
  updatedAt: string;
  postLabels: PostLabel[];
}

export interface CreatePostDto {
  title: string;
  content: string;
  language?: Lang;
  published?: boolean;
}

export interface UpdatePostDto {
  title?: string;
  content?: string;
  language?: Lang;
  published?: boolean;
}

export interface QueryPostDto {
  includeLabels?: boolean;
}
