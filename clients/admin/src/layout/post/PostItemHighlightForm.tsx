import Autocomplete from "@/components/Autocomplete";
import Button from "@/components/Button";
import useCreateHighlight from "@/hooks/query/useCreateHighlight";
import useLabels from "@/hooks/query/useLabels";
import type { HighlightWithOptionalId } from "@shared/types/highlight";
import type { Label } from "@shared/types/label";
import React from "react";
import LabelChip from "../label/LabelChip";
import { useToast } from "../toast/ToastProvider";

type Props = {
  highlight: HighlightWithOptionalId;
};

const PostItemHighlightForm = ({ highlight }: Props) => {
  const [labelInput, setLabelInput] = React.useState("");

  const [comment, setComment] = React.useState(highlight.comment!);
  const [highlightLabels, setHighlightLabels] = React.useState<Label[]>([]);

  React.useEffect(() => {
    setHighlightLabels(highlight.labels!);
    setComment(highlight.comment!);
  }, [highlight]);

  const { data: allLabels = [] } = useLabels();
  const labelOptions = React.useMemo(
    () =>
      allLabels
        .filter((l) => !highlightLabels.some((h) => h.id === l.id))
        .map((l) => l.content),
    [allLabels, highlightLabels],
  );

  const onAutocompleteChange = (content: string) => {
    const newLabel = allLabels.find((v) => v.content === content);
    if (newLabel) {
      setLabelInput("");
      setHighlightLabels((hLs) => [...hLs, newLabel]);
    } else {
      setLabelInput(content);
    }
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
      <h2>Highlight form</h2>
      <Autocomplete
        placeholder="Find label"
        options={labelOptions}
        value={labelInput}
        onChange={onAutocompleteChange}
      />
      <div className="flex gap-4">
        {highlightLabels.map((label) => (
          <LabelChip
            label={label}
            onDelete={() => onDelete(label)}
            confirmOnDelete={false}
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
