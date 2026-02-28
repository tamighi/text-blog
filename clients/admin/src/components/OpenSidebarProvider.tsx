import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type OpenSidebarContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggle: () => void;
};

const OpenSidebarContext = createContext<OpenSidebarContextType | undefined>(
  undefined,
);

type ProviderProps = {
  children: ReactNode;
};

export const OpenSidebarProvider = ({ children }: ProviderProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <OpenSidebarContext.Provider value={{ isOpen, setIsOpen, toggle }}>
      {children}
    </OpenSidebarContext.Provider>
  );
};

export const useOpenSidebar = () => {
  const context = useContext(OpenSidebarContext);

  if (!context) {
    throw new Error(
      "useOpenSidebar must be used within an OpenSidebarProvider",
    );
  }

  return context;
};
