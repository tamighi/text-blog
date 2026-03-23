import { Highlight } from "./highlight";
import { Label } from "./label";

export interface Post {
  id: number;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  labels: Label[];
  highlights: Highlight[];
}

export interface CreatePostDto {
  title: string;
  content: string;
  published?: boolean;
  labelIds?: number[];
}

export interface UpdatePostDto {
  title?: string;
  content?: string;
  published?: boolean;
  labelIds?: number[];
}
