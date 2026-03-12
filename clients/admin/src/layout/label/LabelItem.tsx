import type { Label } from "@shared/types/label";

type Props = {
  label: Label;
};

const LabelItem = ({ label }: Props) => {
  return (
    <div
      className="px-2 py-1 rounded-full"
      style={{ backgroundColor: label.color }}
    >
      <span className="text-black">{label.content}</span>
    </div>
  );
};

export default LabelItem;
