import Button from "@/components/Button";
import type { TextSelectionEvent } from "@/hooks/useTextSelection";
import type { Post } from "@shared/index";
import React from "react";
import PostItemText from "./PostItemText";
import CreateHighlightDialog from "../highlight/CreateHighlightDialog";
import { useToast } from "../toast/ToastProvider";
import useCreateHighlight from "@/hooks/query/useCreateHighlight";
import type { Label } from "@shared/types/label";

type Props = {
  post: Post;
  active: boolean;
};

const PostItemContent = ({ post, active }: Props) => {
  const [selection, setSelection] = React.useState<Range>(new Range());
  const [open, setOpen] = React.useState(false);

  const { toast } = useToast();
  const { mutate } = useCreateHighlight({
    onSuccess: () => {
      toast({ content: "Highlight created" });
      setOpen(false);
    },
    onError: () => toast({ content: "Error" }),
  });

  const onSelect = (selection: TextSelectionEvent) => {
    setSelection(selection.range); // TODO: ref
    setOpen(true);
  };

  const onCreate = (label: Label) => {
    mutate({
      postId: post.id,
      labelIds: [label.id],
      start: selection.startOffset,
      length: selection.endOffset - selection.startOffset,
    });
  };

  return (
    <div className="flex gap-4 items-start">
      <div className="flex flex-col gap-8">
        <PostItemText onSelect={onSelect} post={post} active={active} />
        {active && <Button className="self-start">Save</Button>}
      </div>
      <div>Highlights</div>
      <CreateHighlightDialog
        post={post}
        open={open}
        onClose={() => setOpen(false)}
        onCreate={onCreate}
      />
    </div>
  );
};

export default PostItemContent;
