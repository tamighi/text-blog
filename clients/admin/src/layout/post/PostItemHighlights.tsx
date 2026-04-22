import type { HighlightWithOptionalId } from "@shared/types/highlight";
import type { Post } from "@shared/types/post";
import PostItemHighlightForm from "./PostItemHighlightForm";
import HighlightItem from "./HighlightItem";

type Props = {
  post: Post;
  active: boolean;
  highlight?: HighlightWithOptionalId;
};

const PostItemHighlights = ({ post, active, highlight }: Props) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h2>Highlights</h2>
        {post.highlights.map((h) => (
          <HighlightItem key={h.id} highlight={h} />
        ))}
      </div>

      {active && !!highlight && (
        <div className="flex flex-col gap-4">
          <h2>Highlight form</h2>
          <PostItemHighlightForm highlight={highlight} />
        </div>
      )}
    </div>
  );
};

export default PostItemHighlights;
