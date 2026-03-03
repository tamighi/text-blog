import type { Label } from "@shared/types/label";

type Props = {
  label?: Label;
};

const LabelInput = ({}: Props) => {
  return (
    <input
      className="input"
      placeholder="Name"
      value={label.content}
      onChange={(e) => onLabelChange({ content: e.target.value })}
    />
  );
};

export default LabelInput;
