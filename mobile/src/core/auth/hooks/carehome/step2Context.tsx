import { step2Schema } from "@/src/validation/register/carehome/carehomeRegistration.schema";
import { createContext, useContext, useState } from "react";
import { z } from "zod";

type step2 = z.infer<typeof step2Schema>;

type CarehomeStep2ContextType = {
  data: Partial<step2>;
  setData: (data: step2) => void;
  clearData: () => void;
};

const CarehomeStep2Context = createContext<
  CarehomeStep2ContextType | undefined
>(undefined);

export const CarehomeStep2Provider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [step2Data, setStep2Data] = useState<step2 | {}>({});
  const setData = (data: step2) => setStep2Data(data);
  const clearData = () => setStep2Data({});
  return (
    <CarehomeStep2Context.Provider
      value={{ data: step2Data, setData, clearData }}
    >
      {children}
    </CarehomeStep2Context.Provider>
  );
};

export const useStep2CarehomeData = () => {
  const ctx = useContext(CarehomeStep2Context);
  if (!ctx)
    throw new Error(
      "useStep2CarehomeData must be used within a CarehomeStep2Provider",
    );
  return ctx;
};
