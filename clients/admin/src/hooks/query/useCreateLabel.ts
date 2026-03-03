import { labelService } from "@shared/api/labelService";
import type { CreateLabelDto } from "@shared/types/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateLabel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateLabelDto) => labelService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["labels"] });
    },
  });
};
