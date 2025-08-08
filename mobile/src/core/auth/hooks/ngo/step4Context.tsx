import { step4Schema } from "@/src/validation/register/ngo/ngoRegistration.schema";
import { createContext, useContext, useState } from "react";
import { z } from "zod";

type step4 = z.infer<typeof step4Schema>;

type NgoStep4ContextType = {
  data: Partial<step4>;
  setData: (data: step4) => void;
  clearData: () => void;
};

const NgoStep4Context = createContext<NgoStep4ContextType | undefined>(
  undefined,
);

export const NgoStep4Provider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [step4Data, setstep4Data] = useState<step4 | {}>({});
  const setData = (data: step4) => setstep4Data(data);
  const clearData = () => setstep4Data({});
  return (
    <NgoStep4Context.Provider value={{ data: step4Data, setData, clearData }}>
      {children}
    </NgoStep4Context.Provider>
  );
};

export const useStep4NgoData = () => {
  const ctx = useContext(NgoStep4Context);
  if (!ctx)
    throw new Error("useStep4NgoData must be used within a NgoStep4Provider");
  return ctx;
};
