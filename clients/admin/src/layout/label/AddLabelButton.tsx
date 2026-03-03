import Button from "@/components/Button";
import ColorPicker from "@/components/ColorPicker";
import Dialog from "@/components/Dialog";
import React from "react";

const AddLabelButton = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} title={"New label"}>
        <div className="flex flex-col gap-8">
          <div className="flex flex-row items-start gap-4">
            <input className="input" placeholder="Name" />
            <ColorPicker />
          </div>
          <div className="flex flex-row items-center justify-end gap-4">
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button>Create</Button>
          </div>
        </div>
      </Dialog>
      <Button onClick={() => setOpen(true)}>New label</Button>
    </>
  );
};

export default AddLabelButton;
