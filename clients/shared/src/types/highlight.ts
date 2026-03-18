export interface Highlight {
  id: number;
  start: number;
  length: number;
  comment?: string;
  postId: number;
}

export interface CreateHighlightDto {
  start: number;
  length: number;
  comment?: string;
  postId: number;
}

export interface UpdateHighlightDto {
  start?: number;
  length?: number;
  comment?: string;
}
