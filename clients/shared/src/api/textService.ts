import { Lang } from "../types/enums";
import { TranslatedText } from "../types/text";

export class TextService {
  static getLocalizedText(translatedText: TranslatedText, lang: Lang) {
    return translatedText.localizedTexts.find((txt) => txt.language === lang)?.content;
  }
}
