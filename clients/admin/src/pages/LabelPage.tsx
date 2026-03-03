import Button from "@/components/Button";
import LabelDialog from "@/layout/label/LabelDialog";
import React from "react";

const LabelPage = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <LabelDialog open={open} onClose={() => setOpen(false)} />
      <Button onClick={() => setOpen(true)}>New label</Button>
    </div>
  );
};

export default LabelPage;
