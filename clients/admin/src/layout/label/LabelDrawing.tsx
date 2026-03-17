import useLabels from "@/hooks/query/useLabels";
import LabelChip from "./LabelChip";

const LabelDrawing = () => {
  const { data: labels = [], isLoading } = useLabels();

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      <div className="flex flex-col gap-4">
        {labels.map((label) => (
          <LabelChip key={label.id} label={label} />
        ))}
      </div>
    </div>
  );
};

export default LabelDrawing;
