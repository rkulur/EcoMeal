import { step1Schema } from "@/src/validation/register/carehome/carehomeRegistration.schema";
import { createContext, useContext, useState } from "react";
import { z } from "zod";

type step1 = z.infer<typeof step1Schema>;

type CarehomeStep1ContextType = {
  data: Partial<step1>;
  setData: (data: step1) => void;
  clearData: () => void;
};

const CarehomeStep1Context = createContext<
  CarehomeStep1ContextType | undefined
>(undefined);

export const CarehomeStep1Provider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [step1Data, setStep1Data] = useState<step1 | {}>({});
  const setData = (data: step1) => setStep1Data(data);
  const clearData = () => setStep1Data({});
  return (
    <CarehomeStep1Context.Provider
      value={{ data: step1Data, setData, clearData }}
    >
      {children}
    </CarehomeStep1Context.Provider>
  );
};

export const useStep1CarehomeData = () => {
  const ctx = useContext(CarehomeStep1Context);
  if (!ctx)
    throw new Error(
      "useStep1CarehomeData must be used within a CarehomeStep1Provider",
    );
  return ctx;
};
