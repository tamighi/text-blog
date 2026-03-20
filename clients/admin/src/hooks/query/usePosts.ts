import { postService } from "@shared/index";
import { useQuery } from "@tanstack/react-query";

const usePosts = () => {
  const query = useQuery({
    queryKey: ["posts"],
    queryFn: () => postService.list(),
  });
  return query;
};

export default usePosts;
