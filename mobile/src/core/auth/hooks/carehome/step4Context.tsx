import { step4Schema } from "@/src/validation/register/carehome/carehomeRegistration.schema";
import { createContext, useContext, useState } from "react";
import { z } from "zod";

type step4 = z.infer<typeof step4Schema>;

type CarehomeStep4ContextType = {
  data: Partial<step4>;
  setData: (data: step4) => void;
  clearData: () => void;
};

const CarehomeStep4Context = createContext<
  CarehomeStep4ContextType | undefined
>(undefined);

export const CarehomeStep4Provider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [step4Data, setstep4Data] = useState<step4 | {}>({});
  const setData = (data: step4) => setstep4Data(data);
  const clearData = () => setstep4Data({});
  return (
    <CarehomeStep4Context.Provider
      value={{ data: step4Data, setData, clearData }}
    >
      {children}
    </CarehomeStep4Context.Provider>
  );
};

export const useStep4CarehomeData = () => {
  const ctx = useContext(CarehomeStep4Context);
  if (!ctx)
    throw new Error(
      "useStep4CarehomeData must be used within a CarehomeStep4Provider",
    );
  return ctx;
};
