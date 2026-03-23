import { postService } from "@shared/api/postService";
import type { UpdatePostDto } from "@shared/types/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseUpdatePostProps = {
  onSuccess?: () => void;
  onError?: () => void;
};

type UpdatePostVariables = {
  id: number;
  dto: UpdatePostDto;
};

const useUpdatePost = ({ onSuccess, onError }: UseUpdatePostProps = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dto, id }: UpdatePostVariables) =>
      postService.update(id, dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onSuccess?.();
    },
    onError,
  });
};

export default useUpdatePost;
