import { postService } from "@shared/index";
import { useQuery } from "@tanstack/react-query";

const usePosts = () => {
  const query = useQuery({
    queryKey: ["posts"],
    queryFn: () => postService.list({ includeLabels: true }),
  });
  return query;
};

export default usePosts;
