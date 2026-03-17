import { Label } from "./label";
import { Translated, TranslatedText } from "./text";

export interface PostLabelDto {
  id: number;
  postId: number;
  labelId: number;
  comment: TranslatedText;
  label: Label;
}

export type PostLabel = Omit<PostLabelDto, "comment"> & {
  comment?: string;
}

export interface UpdatePostLabelDto extends Translated {
  labelId?: number;
  comment?: string;
}

export interface CreatePostLabelDto extends Translated {
  postId: number;
  labelId: number;
  comment?: string;
}
