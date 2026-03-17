import { PostLabel } from "./postLabel";
import { Translated, TranslatedText } from "./text";

export interface PostDto {
  id: number;
  title: TranslatedText;
  content: TranslatedText;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  postLabels: PostLabel[];
}

export type Post = Omit<PostDto, "title" | "content"> & {
  title: string;
  content: string;
}

export interface CreatePostDto extends Translated {
  title: string;
  content: string;
  published?: boolean;
}

export interface UpdatePostDto extends Translated {
  title?: string;
  content?: string;
  published?: boolean;
}

export interface QueryPostDto {
  includeLabels?: boolean;
}
