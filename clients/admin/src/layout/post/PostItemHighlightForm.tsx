import Autocomplete from "@/components/Autocomplete";
import useLabels from "@/hooks/query/useLabels";
import type { Highlight } from "@shared/types/highlight";
import type { Label } from "@shared/types/label";
import React from "react";
import LabelChip from "../label/LabelChip";

type Props = {
  highlight?: Highlight;
};

const PostItemHighlightForm = ({ highlight }: Props) => {
  const [labelInput, setLabelInput] = React.useState("");
  const [comment, setComment] = React.useState("");

  const [highlightLabels, setHighlightLabels] = React.useState<Label[]>([]);

  React.useEffect(() => {
    setHighlightLabels(highlight?.labels ?? []);
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

  return (
    <div className="flex flex-col gap-4">
      <Autocomplete
        placeholder="Label"
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
    </div>
  );
};

export default PostItemHighlightForm;
