import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
import React from "react";

const AddLabelButton = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} title={"New label"}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center justify-end gap-4">
            <input className="input" placeholder="Label" />
            <input className="input" placeholder="Color" />
          </div>
          <div className="flex flex-row items-center justify-end gap-4">
            <Button>Cancel</Button>
            <Button>Create</Button>
          </div>
        </div>
      </Dialog>
      <Button variant="success" onClick={() => setOpen(true)}>
        New label
      </Button>
    </>
  );
};

export default AddLabelButton;
