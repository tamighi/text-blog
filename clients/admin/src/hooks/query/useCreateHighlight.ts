import { highlightService } from "@shared/api/highlightService";
import type { CreateHighlightDto } from "@shared/types/highlight";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseCreateHighlightProps = {
  onSuccess?: () => void;
  onError?: () => void;
};

const useCreateHighlight = ({
  onSuccess,
  onError,
}: UseCreateHighlightProps = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateHighlightDto) => highlightService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onSuccess?.();
    },
    onError,
  });
};

export default useCreateHighlight;
