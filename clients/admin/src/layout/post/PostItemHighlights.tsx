import type {
  HighlightWithOptionalId,
  Highlight,
} from "@shared/types/highlight";
import type { Post } from "@shared/types/post";
import PostItemHighlightForm from "./PostItemHighlightForm";
import HighlightItem from "./HighlightItem";

type Props = {
  post: Post;
  activeHighlight?: HighlightWithOptionalId;
  onHighlightOver?: (h: Highlight) => void;
  onHighlightClick?: (h: Highlight) => void;
  onHighlightLeave?: () => void;
};

const PostItemHighlights = ({
  post,
  activeHighlight,
  onHighlightOver,
  onHighlightLeave,
  onHighlightClick,
}: Props) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h2>Highlights</h2>
        {post.highlights.map((h) => (
          <HighlightItem
            onMouseOver={() => onHighlightOver?.(h)}
            onMouseLeave={onHighlightLeave}
            onClick={() => onHighlightClick?.(h)}
            key={h.id}
            highlight={h}
          />
        ))}
      </div>

      {!!activeHighlight && (
        <div className="flex flex-col gap-4">
          <h2>Highlight form</h2>
          <PostItemHighlightForm highlight={activeHighlight} />
        </div>
      )}
    </div>
  );
};

export default PostItemHighlights;
