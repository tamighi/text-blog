import useLabels from "@/hooks/query/useLabels";
import LabelChip from "./LabelChip";
import { useToast } from "../toast/ToastProvider";
import useDeleteLabel from "@/hooks/query/useDeleteLabel";
import type { Label } from "@shared/types/label";

const LabelList = () => {
  const { data: labels = [], isLoading } = useLabels();

  const { toast } = useToast();

  const { mutate } = useDeleteLabel({
    onSuccess: () => {
      toast({ content: "Label deleted." });
    },
    onError: () => toast({ content: "Error" }),
  });

  const onDelete = (label: Label) => {
    mutate(label.id);
  };

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      <div className="flex flex-col gap-4">
        {labels.map((label) => (
          <LabelChip key={label.id} label={label} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

export default LabelList;
