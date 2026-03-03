import type { Lang } from "./enums";

export interface Label {
  id: number;
  content: string;
  color?: string;
  language: Lang;
  conceptId?: number;
}

export interface CreateLabelDto {
  content: string;
  color?: string;
  language?: Lang;
  conceptId?: number;
}

export interface UpdateLabelDto {
  content?: string;
  color?: string;
  language?: Lang;
  conceptId?: number;
}
