import Button from "@/components/Button";
import useCreateHighlight from "@/hooks/query/useCreateHighlight";
import type { HighlightWithOptionalId } from "@shared/types/highlight";
import type { Label } from "@shared/types/label";
import React from "react";
import LabelChip from "../label/LabelChip";
import LabelPicker from "../label/LabelPicker";
import { useToast } from "../toast/ToastProvider";

type Props = {
  highlight: HighlightWithOptionalId;
};

const PostItemHighlightForm = ({ highlight }: Props) => {
  const [comment, setComment] = React.useState(highlight.comment!);
  const [highlightLabels, setHighlightLabels] = React.useState<Label[]>([]);

  React.useEffect(() => {
    setHighlightLabels(highlight.labels!);
    setComment(highlight.comment!);
  }, [highlight]);

  const labelFilter = React.useCallback(
    (labels: Label[]) =>
      labels.filter((l) => !highlightLabels.some((hl) => hl.id === l.id)),
    [highlightLabels],
  );
  const onLabelClick = (newLabel: Label) => {
    setHighlightLabels((hLs) => [...hLs, newLabel]);
  };

  const onDelete = (label: Label) => {
    setHighlightLabels((hLs) => hLs.filter((hL) => hL.id !== label.id));
  };

  const { toast } = useToast();
  const { mutate } = useCreateHighlight({
    onSuccess: () => {
      toast({ content: "Highlight created" });
      // TODO: reset
    },
    onError: () => toast({ content: "Error" }),
  });

  const onSave = () => {
    // create
    mutate({
      ...highlight,
      labelIds: highlightLabels.map((l) => l.id),
      comment,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <LabelPicker onLabelClick={onLabelClick} filter={labelFilter} />
      <div className="flex gap-4">
        {highlightLabels.map((label) => (
          <LabelChip
            label={label}
            onDelete={() => onDelete(label)}
            key={label.id}
          />
        ))}
      </div>
      <textarea
        placeholder="Comment"
        className="input"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button onClick={onSave}>Save</Button>
    </div>
  );
};

export default PostItemHighlightForm;
