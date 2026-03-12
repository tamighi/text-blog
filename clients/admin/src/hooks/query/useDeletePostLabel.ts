import { postLabelService } from "@shared/api/postLabelService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseDeletePostLabelProps = {
  onSuccess?: () => void;
  onError?: () => void;
};

const useDeletePostLabel = ({
  onSuccess,
  onError,
}: UseDeletePostLabelProps = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ labelId, postId }: { labelId: number; postId: number }) =>
      postLabelService.remove(postId, labelId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onSuccess?.();
    },
    onError,
  });
};

export default useDeletePostLabel;
