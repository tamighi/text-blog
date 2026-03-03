import Button from "@/components/Button";
import LabelDialog from "@/layout/label/LabelDialog";
import LabelDrawing from "@/layout/label/LabelDrawing";
import React from "react";

const LabelPage = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <LabelDrawing />
      <LabelDialog
        operation="create"
        open={open}
        onClose={() => setOpen(false)}
      />
      <Button onClick={() => setOpen(true)}>New label</Button>
    </div>
  );
};

export default LabelPage;
