import { Label } from "./label";

export interface Highlight {
  id: number;
  start: number;
  length: number;
  comment?: string;
  postId: number;
  labels: Label[];
}

export interface CreateHighlightDto {
  start: number;
  length: number;
  comment?: string;
  postId: number;
  labelIds: number[]
}

export interface UpdateHighlightDto {
  start?: number;
  length?: number;
  comment?: string;
  labelIds?: number[]
}
