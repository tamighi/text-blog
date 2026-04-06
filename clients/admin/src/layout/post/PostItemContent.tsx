import Button from "@/components/Button";
import type { TextSelectionEvent } from "@/hooks/useTextSelection";
import type { Post } from "@shared/types/post";
import React from "react";
import PostItemHighlights from "./PostItemHighlights";
import PostItemText from "./PostItemText";
import type { HighlightWithOptionalId } from "@shared/types/highlight";

type Props = {
  post: Post;
  active: boolean;
};

const PostItemContent = ({ post, active }: Props) => {
  const [highlight, setHighlight] = React.useState<HighlightWithOptionalId>();

  const onNewHighlight = (h: HighlightWithOptionalId) => {
    setHighlight(h);
  };

  return (
    <div className="flex gap-4 items-start">
      <div className="flex flex-col gap-8">
        <PostItemText
          onNewHighlight={onNewHighlight}
          post={post}
          active={active}
        />
        {active && <Button className="self-start">Save</Button>}
      </div>
      <PostItemHighlights highlight={highlight} post={post} active={active} />
    </div>
  );
};

export default PostItemContent;
