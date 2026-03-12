import { Label } from "./label";

export interface PostLabel {
  postId: number;
  labelId: number;
  label: Label;
}

export interface CreatePostLabelDto {
  postId: number;
  labelId: number;
}
