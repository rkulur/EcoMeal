import { Step3Schema } from "@/src/validation/donate.schema";
import { createContext, useContext, useState } from "react";
import { z } from "zod";

type step3 = z.infer<typeof Step3Schema>;

type Step3ContextType = {
  data: step3;
  setData: (data: step3) => void;
  clearData: () => void;
};

const Step3Context = createContext<Step3ContextType | undefined>(undefined);

export const DonationStep3Provider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [step3Data, setStep3Data] = useState<step3>({
    images: [],
  });
  const setData = (data: step3) => setStep3Data(data);
  const clearData = () =>
    setStep3Data({
      images: [],
    });
  return (
    <Step3Context.Provider value={{ data: step3Data, setData, clearData }}>
      {children}
    </Step3Context.Provider>
  );
};

export const useStep3DonationData = () => {
  const ctx = useContext(Step3Context);
  if (!ctx)
    throw new Error(
      "useStep3DonationData must be used within a DonationStep3Provider",
    );
  return ctx;
};
