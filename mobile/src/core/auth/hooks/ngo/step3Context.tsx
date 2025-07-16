import { step3Schema } from "@/src/validation/ngo/ngoRegistration.schema";
import { createContext, useContext, useState } from "react";
import { z } from "zod";

type step3 = z.infer<typeof step3Schema>;

type NgoStep3ContextType = {
  data: Partial<step3>;
  setData: (data: step3) => void;
  clearData: () => void;
};

const NgoStep3Context = createContext<NgoStep3ContextType | undefined>(
  undefined,
);

export const NgoStep3Provider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [step3Data, setStep3Data] = useState<step3 | {}>({});
  const setData = (data: step3) => setStep3Data(data);
  const clearData = () => setStep3Data({});
  return (
    <NgoStep3Context.Provider value={{ data: step3Data, setData, clearData }}>
      {children}
    </NgoStep3Context.Provider>
  );
};

export const useStep3NgoData = () => {
  const ctx = useContext(NgoStep3Context);
  if (!ctx)
    throw new Error("useStep3NgoData must be used within a NgoStep3Provider");
  return ctx;
};
