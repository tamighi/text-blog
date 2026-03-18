
export interface Label {
  id: number;
  content: string;
  definition?: string;
  color: string;
  conceptId?: number;
}

export interface CreateLabelDto {
  content: string;
  definition: string;
  color: string;
  conceptId?: number;
}

export interface UpdateLabelDto {
  content?: string;
  definition?: string;
  color?: string;
  conceptId?: number;
}

export interface QueryLabelDto {
  excludePostId?: number;
}
