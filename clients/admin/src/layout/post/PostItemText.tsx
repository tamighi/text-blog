import {
  useTextSelection,
  type TextSelectionEvent,
} from "@/hooks/useTextSelection";
import type { Post } from "@shared/index";
import React from "react";

type Props = {
  post: Post;
  active: boolean;
};

const PostItemText = ({ post, active }: Props) => {
  const ref = React.useRef<HTMLParagraphElement>(null);

  const onSelect = (e: TextSelectionEvent) => {
    console.log(e);
  };

  useTextSelection(ref, { enabled: active, onSelect });

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
