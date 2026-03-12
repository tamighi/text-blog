import useDeletePostLabel from "@/hooks/query/useDeletePostLabel";
import type { PostLabel } from "@shared/types/postLabel";
import { useToast } from "../toast/ToastProvider";

type Props = {
  postLabel: PostLabel;
};

const PostLabelItem = ({ postLabel }: Props) => {
  const { toast } = useToast();

  const { mutate } = useDeletePostLabel({
    onSuccess: () => {
      toast({ content: "Label deleted." });
    },
    onError: () => toast({ content: "Error" }),
  });

  const onDelete = () => {
    mutate({ labelId: postLabel.labelId, postId: postLabel.postId });
  };

  return (
    <div
      className="px-2 py-1 rounded-full relative"
      style={{ backgroundColor: postLabel.label.color }}
    >
      <button
        onClick={onDelete}
        className="flex items-center justify-center absolute w-5 h-5 -right-2
          -top-3 bg-elevation-2 rounded-full cursor-pointer"
      >
        ×
      </button>
      <span className="text-black">{postLabel.label.content}</span>
    </div>
  );
};

export default PostLabelItem;
