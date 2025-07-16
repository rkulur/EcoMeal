import { step2Schema } from "@/src/validation/donor/donorRegistration.schema";
import { createContext, useContext, useState } from "react";
import { z } from "zod";

type step2 = z.infer<typeof step2Schema>;

type DonorStep2ContextType = {
  data: Partial<step2>;
  setData: (data: step2) => void;
  clearData: () => void;
};

const DonorStep2Context = createContext<DonorStep2ContextType | undefined>(
  undefined,
);

export const DonorStep2Provider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [step2Data, setStep2Data] = useState<step2 | {}>({});
  const setData = (data: step2) => setStep2Data(data);
  const clearData = () => setStep2Data({});
  return (
    <DonorStep2Context.Provider value={{ data: step2Data, setData, clearData }}>
      {children}
    </DonorStep2Context.Provider>
  );
};

export const useStep2DonorData = () => {
  const ctx = useContext(DonorStep2Context);
  if (!ctx)
    throw new Error(
      "useStep2DonorData must be used within a DonorStep2Provider",
    );
  return ctx;
};
