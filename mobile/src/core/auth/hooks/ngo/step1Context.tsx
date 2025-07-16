import { step1Schema } from "@/src/validation/ngo/ngoRegistration.schema";
import { createContext, useContext, useState } from "react";
import { z } from "zod";

type step1 = z.infer<typeof step1Schema>;

type NgoStep1ContextType = {
  data: Partial<step1>;
  setData: (data: step1) => void;
  clearData: () => void;
};

const NgoStep1Context = createContext<NgoStep1ContextType | undefined>(
  undefined,
);

export const NgoStep1Provider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [step1Data, setStep1Data] = useState<step1 | {}>({});
  const setData = (data: step1) => setStep1Data(data);
  const clearData = () => setStep1Data({});
  return (
    <NgoStep1Context.Provider value={{ data: step1Data, setData, clearData }}>
      {children}
    </NgoStep1Context.Provider>
  );
};

export const useStep1NgoData = () => {
  const ctx = useContext(NgoStep1Context);
  if (!ctx)
    throw new Error("useStep1NgoData must be used within a NgoStep1Provider");
  return ctx;
};
