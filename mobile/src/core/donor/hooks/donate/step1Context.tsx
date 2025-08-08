import { Step1Schema } from "@/src/validation/donate.schema";
import { createContext, useContext, useState } from "react";
import { z } from "zod";

type step1 = z.infer<typeof Step1Schema>;

type Step1ContextType = {
  data: step1;
  setData: (data: step1) => void;
  clearData: () => void;
};

const Step1Context = createContext<Step1ContextType | undefined>(undefined);

export const DonationStep1Provider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [step1Data, setStep1Data] = useState<step1>({
    foodItems: [],
  });
  const setData = (data: step1) => setStep1Data(data);
  const clearData = () =>
    setStep1Data({
      foodItems: [],
    });
  return (
    <Step1Context.Provider value={{ data: step1Data, setData, clearData }}>
      {children}
    </Step1Context.Provider>
  );
};

export const useStep1DonationData = () => {
  const ctx = useContext(Step1Context);
  if (!ctx)
    throw new Error(
      "useStep1DonationData must be used within a DonationStep1Provider",
    );
  return ctx;
};
