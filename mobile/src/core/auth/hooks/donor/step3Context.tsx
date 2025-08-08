import { step3Schema } from "@/src/validation/register/donor/donorRegistration.schema";
import { createContext, useContext, useState } from "react";
import { z } from "zod";

type step3 = z.infer<typeof step3Schema>;

type DonorStep3ContextType = {
  data: Partial<step3>;
  setData: (data: step3) => void;
  clearData: () => void;
};

const DonorStep3Context = createContext<DonorStep3ContextType | undefined>(
  undefined,
);

export const DonorStep3Provider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [step3Data, setStep3Data] = useState<step3 | {}>({});
  const setData = (data: step3) => setStep3Data(data);
  const clearData = () => setStep3Data({});
  return (
    <DonorStep3Context.Provider value={{ data: step3Data, setData, clearData }}>
      {children}
    </DonorStep3Context.Provider>
  );
};

export const useStep3DonorData = () => {
  const ctx = useContext(DonorStep3Context);
  if (!ctx)
    throw new Error(
      "useStep3DonorData must be used within a DonorStep3Provider",
    );
  return ctx;
};
