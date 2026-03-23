import type { HighlightWithOptionalId } from "@shared/types/highlight";
import type { Post } from "@shared/types/post";
import PostItemHighlightForm from "./PostItemHighlightForm";

type Props = {
  post: Post;
  active: boolean;
  highlight?: HighlightWithOptionalId;
};

const PostItemHighlights = ({ post, active, highlight }: Props) => {
  return (
    <div className="flex gap-4">
      {active && !!highlight && <PostItemHighlightForm highlight={highlight} />}
    </div>
  );
};

export default PostItemHighlights;
