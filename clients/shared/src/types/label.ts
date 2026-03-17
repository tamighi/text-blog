import { Translated, TranslatedText } from "./text";

export interface LabelDto {
  id: number;
  content: TranslatedText;
  definition: TranslatedText;
  color: string;
  conceptId?: number;
}

export type Label = Omit<LabelDto, "content" | "definition"> & {
  content: string;
  definition: string;
}

export interface CreateLabelDto extends Translated {
  content: string;
  definition: string;
  color: string;
  conceptId?: number;
}

export interface UpdateLabelDto extends Translated {
  content?: string;
  definition?: string;
  color?: string;
  conceptId?: number;
}

export interface QueryLabelDto {
  excludePostId?: number;
}
