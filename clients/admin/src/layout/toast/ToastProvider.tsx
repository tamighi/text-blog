import React from "react";
import Toast from "./Toast";

type CreateToastProps = {
  content: string;
};

type ToastContextType = {
  toast: (props: CreateToastProps) => void;
};

const ToastContext = React.createContext<ToastContextType | undefined>(
  undefined,
);

type ProviderProps = {
  children: React.ReactNode;
};

export const ToastProvider = ({ children }: ProviderProps) => {
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState("");

  const toast = React.useCallback(({ content }: CreateToastProps) => {
    setOpen(true);
    setContent(content);

    setTimeout(() => {
      setOpen(false);
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <Toast content={content} open={open} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};
