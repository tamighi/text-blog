import { postLabelService } from "@shared/api/postLabelService";
import type { CreatePostLabelDto } from "@shared/types/postLabel";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseCreatePostLabelProps = {
  onSuccess?: () => void;
  onError?: () => void;
};

const useCreatePostLabel = ({
  onSuccess,
  onError,
}: UseCreatePostLabelProps = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreatePostLabelDto) => postLabelService.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onSuccess?.();
    },
    onError,
  });
};

export default useCreatePostLabel;
