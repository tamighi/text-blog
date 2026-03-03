import { labelService } from "@shared/api/labelService";
import type { CreateLabelDto } from "@shared/types/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseCreateLabelProps = {
  onSuccess?: () => void;
  onError?: () => void;
};

const useCreateLabel = ({ onSuccess, onError }: UseCreateLabelProps = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateLabelDto) => labelService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["labels"] });
      onSuccess?.();
    },
    onError,
  });
};

export default useCreateLabel;
