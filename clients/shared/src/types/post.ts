import { PostLabel } from "./postLabel";
import { Highlight } from "./highlight";

export interface Post {
  id: number;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  postLabels: PostLabel[];
  highlights: Highlight[];
}

export interface CreatePostDto {
  title: string;
  content: string;
  published?: boolean;
}

export interface UpdatePostDto {
  title?: string;
  content?: string;
  published?: boolean;
}
