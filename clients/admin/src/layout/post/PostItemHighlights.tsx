import type { Post } from "@shared/types/post";
import PostItemHighlightForm from "./PostItemHighlightForm";

type Props = {
  post: Post;
  active: boolean;
};

const PostItemHighlights = ({ post, active }: Props) => {
  return (
    <div className="flex gap-4">{active && <PostItemHighlightForm />}</div>
  );
};

export default PostItemHighlights;
