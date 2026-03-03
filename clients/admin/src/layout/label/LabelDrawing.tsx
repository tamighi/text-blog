import useLabels from "@/hooks/query/useLabels";

const LabelDrawing = () => {
  const { data: labels = [], isLoading } = useLabels();

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      <div className="flex flex-col gap-4">
        {labels.map((label) => (
          <span
            key={label.id}
            className="text-fg-secondary"
            style={{ backgroundColor: label.color }}
          >
            {label.content}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LabelDrawing;
