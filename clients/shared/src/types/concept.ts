export interface Concept {
  id: number;
  parentId?: number | null;
}

export interface CreateConceptDto {
  parentId?: number;
  labelIds: number[];
}

export interface UpdateConceptDto {
  parentId?: number;
  labelIds?: number[];
}
