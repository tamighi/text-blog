
export interface Label {
  id: number;
  content: string;
  definition?: string;
  color: string;
}

export interface CreateLabelDto {
  content: string;
  definition: string;
  color: string;
}

export interface UpdateLabelDto {
  content?: string;
  definition?: string;
  color?: string;
}
