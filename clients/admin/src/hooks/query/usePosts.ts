import { postService } from "@shared/api/postService";
import { useQuery } from "@tanstack/react-query";

const usePosts = () => {
  const query = useQuery({
    queryKey: ["posts"],
    queryFn: () => postService.list(),
  });
  return query;
};

export default usePosts;
