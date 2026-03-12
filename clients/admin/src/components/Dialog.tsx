import React from "react";
import Button from "./Button";

export type DialogProps = {
  children?: React.ReactNode;
  open: boolean;
  onClose?: () => void;
  title?: string;
};

const Dialog = ({ open, children, onClose, title }: DialogProps) => {
  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center
            bg-black/50"
        >
          <div
            className="bg-elevation-1 rounded-lg shadow-lg p-4 flex flex-col
              gap-4 min-w-80"
          >
            <div className="flex flex-row justify-between items-center gap-4">
              <h2>{title}</h2>
              <Button onClick={onClose} variant="outlined">
                X
              </Button>
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Dialog;
