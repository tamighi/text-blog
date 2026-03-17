import type { Lang } from "./enums";
import { PostLabel } from "./postLabel";
import { TranslatedText } from "./text";

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

export interface PostDto {
  id: number;
  title: TranslatedText;
  content: TranslatedText;
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

export interface OptionsPostDto {
  lang?: Lang;
}
