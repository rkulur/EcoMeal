import { step1Schema } from "@/src/validation/register/composter/composterRegistration.schema";
import { createContext, useContext, useState } from "react";
import { z } from "zod";

type step1 = z.infer<typeof step1Schema>;

type ComposterStep1ContextType = {
  data: Partial<step1>;
  setData: (data: step1) => void;
  clearData: () => void;
};

const ComposterStep1Context = createContext<
  ComposterStep1ContextType | undefined
>(undefined);

export const ComposterStep1Provider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [step1Data, setStep1Data] = useState<step1 | {}>({});
  const setData = (data: step1) => setStep1Data(data);
  const clearData = () => setStep1Data({});
  return (
    <ComposterStep1Context.Provider
      value={{ data: step1Data, setData, clearData }}
    >
      {children}
    </ComposterStep1Context.Provider>
  );
};

export const useStep1ComposterData = () => {
  const ctx = useContext(ComposterStep1Context);
  if (!ctx)
    throw new Error(
      "useStep1ComposterData must be used within a ComposterStep1Provider",
    );
  return ctx;
};
