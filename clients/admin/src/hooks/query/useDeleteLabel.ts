import { labelService } from "@shared/api/labelService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseDeleteLabelProps = {
  onSuccess?: () => void;
  onError?: () => void;
};

const useDeleteLabel = ({ onSuccess, onError }: UseDeleteLabelProps = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => labelService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["labels"] });
      onSuccess?.();
    },
    onError,
  });
};

export default useDeleteLabel;
