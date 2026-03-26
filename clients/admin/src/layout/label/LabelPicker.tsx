import Autocomplete from "@/components/Autocomplete";
import useLabels from "@/hooks/query/useLabels";
import type { Label } from "@shared/types/label";
import React from "react";

type Props = {
  filter?: (labels: Label[]) => Label[];
  onLabelClick?: (label: Label) => void;
};

const LabelPicker = ({ filter = (l) => l, onLabelClick }: Props) => {
  const [labelInput, setLabelInput] = React.useState("");

  const { data: allLabels = [] } = useLabels();
  const labelOptions = React.useMemo(
    () => filter(allLabels).map((l) => l.content),
    [allLabels, filter],
  );

  const onAutocompleteChange = (content: string) => {
    const newLabel = allLabels.find((v) => v.content === content);
    if (newLabel) {
      setLabelInput("");
      onLabelClick?.(newLabel);
    } else {
      setLabelInput(content);
    }
  };

  return (
    <Autocomplete
      placeholder="Find label"
      options={labelOptions}
      value={labelInput}
      onChange={onAutocompleteChange}
    />
  );
};

export default LabelPicker;
