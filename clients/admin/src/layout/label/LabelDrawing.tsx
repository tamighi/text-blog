import useLabels from "@/hooks/query/useLabels";
import LabelItem from "./LabelItem";

const LabelDrawing = () => {
  const { data: labels = [], isLoading } = useLabels();

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      <div className="flex flex-col gap-4">
        {labels.map((label) => (
          <LabelItem key={label.id} label={label} />
        ))}
      </div>
    </div>
  );
};

export default LabelDrawing;
