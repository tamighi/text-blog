import useDeleteLabel from "@/hooks/query/useDeleteLabel";
import type { Label } from "@shared/types/label";
import { useToast } from "../toast/ToastProvider";
import LabelChipBase from "./LabelChipBase";

type Props = {
  label: Label;
};

const LabelChip = ({ label }: Props) => {
  const { toast } = useToast();

  const { mutate } = useDeleteLabel({
    onSuccess: () => {
      toast({ content: "Label deleted." });
    },
    onError: () => toast({ content: "Error" }),
  });

  const onDelete = () => {
    mutate(label.id);
  };

  return (
    <LabelChipBase label={label} onDeleteConfirm={onDelete}>
      {label.content}
    </LabelChipBase>
  );
};

export default LabelChip;
