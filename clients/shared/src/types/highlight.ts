import { Translated, TranslatedText } from "./text";

export interface HighlightDto {
  id: number;
  start: number;
  length: number;
  comment: TranslatedText;
  postId: number;
}

export type Highlight = Omit<HighlightDto, "comment"> & {
  comment?: string;
}

export interface CreateHighlightDto extends Translated {
  start: number;
  length: number;
  comment?: string;
  postId: number;
}

export interface UpdateHighlightDto extends Translated {
  start?: number;
  length?: number;
  comment?: string;
}
