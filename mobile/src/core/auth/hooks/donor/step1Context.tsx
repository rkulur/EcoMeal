import { step1Schema } from "@/src/validation/donor/donorRegistration.schema";
import { createContext, useContext, useState } from "react";
import { z } from "zod";

type step1 = z.infer<typeof step1Schema>;

type DonorStep1ContextType = {
  data: Partial<step1>;
  setData: (data: step1) => void;
  clearData: () => void;
};

const DonorStep1Context = createContext<DonorStep1ContextType | undefined>(
  undefined,
);

export const DonorStep1Provider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [step1Data, setStep1Data] = useState<step1 | {}>({});
  const setData = (data: step1) => setStep1Data(data);
  const clearData = () => setStep1Data({});
  return (
    <DonorStep1Context.Provider value={{ data: step1Data, setData, clearData }}>
      {children}
    </DonorStep1Context.Provider>
  );
};

export const useStep1DonorData = () => {
  const ctx = useContext(DonorStep1Context);
  if (!ctx)
    throw new Error(
      "useStep1DonorData must be used within a DonorStep1Provider",
    );
  return ctx;
};
