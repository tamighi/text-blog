import Button from "@/components/Button";
import CreateLabelDialog from "@/layout/label/CreateLabelDialog";
import LabelDrawing from "@/layout/label/LabelDrawing";
import React from "react";

const LabelPage = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <LabelDrawing />
      <CreateLabelDialog open={open} onClose={() => setOpen(false)} />
      <Button onClick={() => setOpen(true)}>New label</Button>
    </div>
  );
};

export default LabelPage;
