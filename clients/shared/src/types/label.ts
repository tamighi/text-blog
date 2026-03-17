export interface Label {
  id: number;
  content: string;
  color: string;
  conceptId?: number;
}

export interface CreateLabelDto {
  content: string;
  color: string;
  conceptId?: number;
}

export interface UpdateLabelDto {
  content?: string;
  color?: string;
  conceptId?: number;
}

export interface QueryLabelDto {
  excludePostId?: number;
}
