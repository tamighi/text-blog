import {
  useTextSelection,
  type TextSelectionEvent,
} from "@/hooks/useTextSelection";
import type { Post } from "@shared/index";
import React from "react";

type Props = {
  post: Post;
  active: boolean;
  onSelect?: (e: TextSelectionEvent) => void;
  onClear?: () => void;
};

const PostItemText = ({ post, active, onSelect, onClear }: Props) => {
  const ref = React.useRef<HTMLParagraphElement>(null);

  useTextSelection(ref, { enabled: active, onSelect, onClear });

  return (
    <p
      ref={ref}
      contentEditable={active}
      dangerouslySetInnerHTML={{ __html: post.content }}
      className={`mt-2 text-md text-fg-secondary w-[36vw]
        whitespace-break-spaces ${
          active ? "max-h-[75vh] overflow-scroll" : "max-h-12 overflow-hidden"
        }`}
    ></p>
  );
};

export default PostItemText;
