import { Lang } from "./enums";

export interface Post {
  id: string;
  title: string;
  content: string;
  language: Lang;
  published: boolean;
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
