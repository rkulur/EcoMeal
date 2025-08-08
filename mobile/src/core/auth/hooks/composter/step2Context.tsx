import { step2Schema } from "@/src/validation/register/composter/composterRegistration.schema";
import { createContext, useContext, useState } from "react";
import { z } from "zod";

type step2 = z.infer<typeof step2Schema>;

type ComposterStep2ContextType = {
  data: Partial<step2>;
  setData: (data: step2) => void;
  clearData: () => void;
};

const ComposterStep2Context = createContext<
  ComposterStep2ContextType | undefined
>(undefined);

export const ComposterStep2Provider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [step2Data, setStep2Data] = useState<step2 | {}>({});
  const setData = (data: step2) => setStep2Data(data);
  const clearData = () => setStep2Data({});
  return (
    <ComposterStep2Context.Provider
      value={{ data: step2Data, setData, clearData }}
    >
      {children}
    </ComposterStep2Context.Provider>
  );
};

export const useStep2ComposterData = () => {
  const ctx = useContext(ComposterStep2Context);
  if (!ctx)
    throw new Error(
      "useStep2ComposterData must be used within a ComposterStep2Provider",
    );
  return ctx;
};
