import type { Lang } from "./enums";

export interface Post {
  id: number;
  title: string;
  content: string;
  published: boolean;
  language: Lang;
  createdAt: string;
  updatedAt: string;
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
