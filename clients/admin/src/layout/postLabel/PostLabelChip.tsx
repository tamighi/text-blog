import useDeletePostLabel from "@/hooks/query/useDeletePostLabel";
import type { PostLabel } from "@shared/types/postLabel";
import { useToast } from "../toast/ToastProvider";
import LabelChipBase from "../label/LabelChipBase";

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
    <LabelChipBase label={postLabel.label} onDeleteConfirm={onDelete}>
      {postLabel.comment}
    </LabelChipBase>
  );
};

export default PostLabelChip;
