import { createContext, ReactNode, useContext, useState } from "react";

type AlertModalContextType = {
  showModal: (heading: string, message: string) => void;
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  heading: string;
  message: string;
};

const AlertModalContext = createContext<AlertModalContextType | undefined>(
  undefined,
);

export const AlertModalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [heading, setHeading] = useState("");
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const showModal = (heading: string, message: string) => {
    setIsVisible(true);
    setHeading(heading);
    setMessage(message);
  };

  return (
    <AlertModalContext.Provider
      value={{ showModal, isVisible, setIsVisible, heading, message }}
    >
      {children}
    </AlertModalContext.Provider>
  );
};

export const useAlertModal = () => {
  const context = useContext(AlertModalContext);

  if (!context) {
    throw new Error(
      `"useAlertModal()" should be used inside "AlertModalProvider" component`,
    );
  }
  return context;
};
