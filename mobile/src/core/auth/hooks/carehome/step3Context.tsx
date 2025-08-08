import { step3Schema } from "@/src/validation/register/carehome/carehomeRegistration.schema";
import { createContext, useContext, useState } from "react";
import { z } from "zod";

type step3 = z.infer<typeof step3Schema>;

type CarehomeStep3ContextType = {
  data: Partial<step3>;
  setData: (data: step3) => void;
  clearData: () => void;
};

const CarehomeStep3Context = createContext<
  CarehomeStep3ContextType | undefined
>(undefined);

export const CarehomeStep3Provider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [step3Data, setStep3Data] = useState<step3 | {}>({});
  const setData = (data: step3) => setStep3Data(data);
  const clearData = () => setStep3Data({});
  return (
    <CarehomeStep3Context.Provider
      value={{ data: step3Data, setData, clearData }}
    >
      {children}
    </CarehomeStep3Context.Provider>
  );
};

export const useStep3CarehomeData = () => {
  const ctx = useContext(CarehomeStep3Context);
  if (!ctx)
    throw new Error(
      "useStep3CarehomeData must be used within a CarehomeStep3Provider",
    );
  return ctx;
};
