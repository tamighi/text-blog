import { Lang } from "./enums";

export interface LocalizedText {
  id: number;
  content: string;
  language: Lang;
}

export interface translatedText {
  localizedTexts: LocalizedText[]
  id: number
}
