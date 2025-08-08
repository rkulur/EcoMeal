import { step3Schema } from "@/src/validation/register/composter/composterRegistration.schema";
import { createContext, useContext, useState } from "react";
import { z } from "zod";

type step3 = z.infer<typeof step3Schema>;

type ComposterStep3ContextType = {
  data: Partial<step3>;
  setData: (data: step3) => void;
  clearData: () => void;
};

const ComposterStep3Context = createContext<
  ComposterStep3ContextType | undefined
>(undefined);

export const ComposterStep3Provider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [step3Data, setStep3Data] = useState<step3 | {}>({});
  const setData = (data: step3) => setStep3Data(data);
  const clearData = () => setStep3Data({});
  return (
    <ComposterStep3Context.Provider
      value={{ data: step3Data, setData, clearData }}
    >
      {children}
    </ComposterStep3Context.Provider>
  );
};

export const useStep3ComposterData = () => {
  const ctx = useContext(ComposterStep3Context);
  if (!ctx)
    throw new Error(
      "useStep3ComposterData must be used within a ComposterStep3Provider",
    );
  return ctx;
};
