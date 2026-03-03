import Button from "@/components/Button";
import LabelDrawing from "@/layout/label/LabelDrawing";
import NewLabelDialog from "@/layout/label/NewLabelDialog";
import React from "react";

const LabelPage = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <LabelDrawing />
      <NewLabelDialog open={open} onClose={() => setOpen(false)} />
      <Button onClick={() => setOpen(true)}>New label</Button>
    </div>
  );
};

export default LabelPage;
