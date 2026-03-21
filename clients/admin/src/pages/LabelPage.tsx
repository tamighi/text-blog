import Button from "@/components/Button";
import CreateLabelDialog from "@/layout/label/CreateLabelDialog";
import LabelList from "@/layout/label/LabelList";
import React from "react";

const LabelPage = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <LabelList />
      <CreateLabelDialog open={open} onClose={() => setOpen(false)} />
      <Button onClick={() => setOpen(true)}>New label</Button>
    </div>
  );
};

export default LabelPage;
