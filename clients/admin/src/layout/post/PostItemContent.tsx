import Button from "@/components/Button";
import { useTextSelection } from "@/hooks/useTextSelection";
import type { Post } from "@shared/types/post";
import React from "react";
import HighlightedText from "./highlights/HighlightedText";
import PostItemHighlights from "./PostItemHighlights";
import useHighlightLogic from "./useHighlightLogic";

type Props = {
  post: Post;
  active: boolean;
};

const PostItemContent = ({ post, active }: Props) => {
  const { highlights, activeHighlight, onSelect, onClick, onHover, onLeave } =
    useHighlightLogic(post);

  const ref = React.useRef<HTMLDivElement>(null);

  useTextSelection(ref, { enabled: active, onSelect });

  return (
    <div className="flex gap-4 items-start">
      <div className="flex flex-col gap-8">
        <div
          ref={ref}
          className={`mt-2 text-md text-fg-secondary pr-2 w-100
            whitespace-break-spaces ${
              active
                ? "max-h-[65vh] overflow-scroll"
                : "max-h-12 overflow-hidden"
            }`}
        >
          <HighlightedText highlights={highlights} text={post.content} />
        </div>

        {active && <Button className="self-start">Save</Button>}
      </div>
      {active && (
        <PostItemHighlights
          post={post}
          onHighlightClick={onClick}
          onHighlightOver={onHover}
          onHighlightLeave={onLeave}
          activeHighlight={activeHighlight}
        />
      )}
    </div>
  );
};

export default PostItemContent;
