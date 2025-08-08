import { step2Schema } from "@/src/validation/register/ngo/ngoRegistration.schema";
import { createContext, useContext, useState } from "react";
import { z } from "zod";

type step2 = z.infer<typeof step2Schema>;

type NgoStep2ContextType = {
  data: Partial<step2>;
  setData: (data: step2) => void;
  clearData: () => void;
};

const NgoStep2Context = createContext<NgoStep2ContextType | undefined>(
  undefined,
);

export const NgoStep2Provider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [step2Data, setStep2Data] = useState<step2 | {}>({});
  const setData = (data: step2) => setStep2Data(data);
  const clearData = () => setStep2Data({});
  return (
    <NgoStep2Context.Provider value={{ data: step2Data, setData, clearData }}>
      {children}
    </NgoStep2Context.Provider>
  );
};

export const useStep2NgoData = () => {
  const ctx = useContext(NgoStep2Context);
  if (!ctx)
    throw new Error("useStep2NgoData must be used within a NgoStep2Provider");
  return ctx;
};
