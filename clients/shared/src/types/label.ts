
export interface Label {
  id: number;
  content: string;
  definition?: string;
}

export interface CreateLabelDto {
  content: string;
  definition?: string;
}

export interface UpdateLabelDto {
  content?: string;
  definition?: string;
}
