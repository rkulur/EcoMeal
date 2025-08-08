import { Step2Schema } from "@/src/validation/donate.schema";
import { createContext, useContext, useState } from "react";
import { z } from "zod";

type step2 = z.infer<typeof Step2Schema>;

type Step2ContextType = {
  data: step2;
  setData: (data: step2) => void;
  clearData: () => void;
};

const Step2Context = createContext<Step2ContextType | undefined>(undefined);

export const DonationStep2Provider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [step2Data, setStep2Data] = useState<step2>({
    pickupAddress: {
      address: "",
      coordinates: {
        lat: 0,
        lng: 0,
      },
    },
  });
  const setData = (data: step2) => setStep2Data(data);
  const clearData = () =>
    setStep2Data({
      pickupAddress: {
        address: "",
        coordinates: {
          lat: 0,
          lng: 0,
        },
      },
    });
  return (
    <Step2Context.Provider value={{ data: step2Data, setData, clearData }}>
      {children}
    </Step2Context.Provider>
  );
};

export const useStep2DonationData = () => {
  const ctx = useContext(Step2Context);
  if (!ctx)
    throw new Error(
      "useStep2DonationData must be used within a DonationStep2Provider",
    );
  return ctx;
};
