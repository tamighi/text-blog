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
  const [labelInput, setLabelInput] = React.useState<Label>();
  const [comment, setComment] = React.useState("");
  const highlightLabels = React.useMemo(
    () => highlight?.labels ?? [],
    [highlight],
  );

  const { data: allLabels = [] } = useLabels();
  const labelOptions = React.useMemo(
    () =>
      allLabels
        .filter((l) => !highlight?.labels.some((h) => h.id === l.id))
        .map((l) => l.content),
    [allLabels],
  );

  const onAutocompleteChange = (content: string) => {
    const newLabel = allLabels.find((v) => v.content === content);
    setLabelInput(newLabel);
  };

  return (
    <div className="flex flex-col gap-4">
      <Autocomplete
        placeholder="Name"
        options={labelOptions}
        onChange={onAutocompleteChange}
      />
      <div className="flex gap-4">
        {highlightLabels.map((label) => (
          <LabelChip label={label} key={label.id} />
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
