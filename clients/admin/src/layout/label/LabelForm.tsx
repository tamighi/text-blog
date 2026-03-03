import useLabels from "@/hooks/query/useLabels";
import type { Label } from "@shared/types/label";

type Props = {
  label?: Label;
};

const LabelForm = ({ label }: Props) => {
  return (
    <div className="flex flex-row items-start gap-4">
      <input
        className="input"
        placeholder="Name"
        value={label.content}
        onChange={(e) => onLabelChange({ content: e.target.value })}
      />
      <ColorPicker
        value={label.color}
        onChange={(color) => onLabelChange({ color })}
      />
    </div>
  );
};

export default LabelForm;
