import useDeletePostLabel from "@/hooks/query/useDeletePostLabel";
import type { PostLabel } from "@shared/types/postLabel";
import { useToast } from "../toast/ToastProvider";
import LabelChip from "../label/LabelChip";

type Props = {
  postLabel: PostLabel;
};

const PostLabelChip = ({ postLabel }: Props) => {
  const { toast } = useToast();

  const { mutate } = useDeletePostLabel({
    onSuccess: () => {
      toast({ content: "Label deleted." });
    },
    onError: () => toast({ content: "Error" }),
  });

  const onDelete = () => {
    mutate(postLabel.id);
  };

  return (
    <LabelChip
      label={postLabel.label}
      popoverNode={postLabel.comment}
      onDelete={onDelete}
    />
  );
};

export default PostLabelChip;
