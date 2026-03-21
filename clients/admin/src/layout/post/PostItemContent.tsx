import Button from "@/components/Button";
import type { TextSelectionEvent } from "@/hooks/useTextSelection";
import type { Post } from "@shared/index";
import React from "react";
import PostItemText from "./PostItemText";
import { useToast } from "../toast/ToastProvider";
import useCreateHighlight from "@/hooks/query/useCreateHighlight";
import type { Label } from "@shared/types/label";
import PostItemHighlights from "./PostItemHighlights";

type Props = {
  post: Post;
  active: boolean;
};

const PostItemContent = ({ post, active }: Props) => {
  const selectionRef = React.useRef<TextSelectionEvent>(null);

  const { toast } = useToast();
  const { mutate } = useCreateHighlight({
    onSuccess: () => {
      toast({ content: "Highlight created" });
    },
    onError: () => toast({ content: "Error" }),
  });

  const onSelect = (selection: TextSelectionEvent) => {
    selectionRef.current = selection;
  };

  const onCreate = (label: Label) => {
    const range = selectionRef.current!.range;

    mutate({
      postId: post.id,
      labelIds: [label.id],
      start: range.startOffset,
      length: range.endOffset - range.startOffset,
    });
  };

  return (
    <div className="flex gap-4 items-start">
      <div className="flex flex-col gap-8">
        <PostItemText onSelect={onSelect} post={post} active={active} />
        {active && <Button className="self-start">Save</Button>}
      </div>
      <PostItemHighlights post={post} active={active} />
    </div>
  );
};

export default PostItemContent;
