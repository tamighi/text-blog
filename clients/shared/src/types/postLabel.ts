import { Label } from "./label";

export interface PostLabel {
  id: number;
  postId: number;
  labelId: number;
  comment?: string;
  label: Label;
}


export interface UpdatePostLabelDto {
  labelId?: number;
  comment?: string;
}

export interface CreatePostLabelDto {
  postId: number;
  labelId: number;
  comment?: string;
}
