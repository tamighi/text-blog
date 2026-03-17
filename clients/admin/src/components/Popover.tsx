import React from "react";

type PopoverProps = {
  anchorRef: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
  className?: string;
};

const Popover = ({ anchorRef, children, className }: PopoverProps) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;

    const handleEnter = () => setOpen(true);
    const handleLeave = () => setOpen(false);

    anchor.addEventListener("mouseenter", handleEnter);
    anchor.addEventListener("mouseleave", handleLeave);

    return () => {
      anchor.removeEventListener("mouseenter", handleEnter);
      anchor.removeEventListener("mouseleave", handleLeave);
    };
  }, [anchorRef]);

  if (!open || !anchorRef.current) return null;

  const rect = anchorRef.current.getBoundingClientRect();

  return (
    <div
      className={`fixed z-50 bg-elevation-1 shadow-lg rounded p-2 ${className}`}
      style={{
        top: rect.bottom,
        left: rect.left,
      }}
    >
      {children}
    </div>
  );
};

export default Popover;
