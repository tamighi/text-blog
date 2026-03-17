import { Lang } from "./enums";

export interface LocalizedText {
  id: number;
  content: string;
  language: Lang;
}

export interface TranslatedText {
  localizedTexts: LocalizedText[]
  id: number
}

export interface Translated {
  lang?: Lang;
}
