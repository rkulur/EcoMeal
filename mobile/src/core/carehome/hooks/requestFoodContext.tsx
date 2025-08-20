import { FoodRequestType } from "@/src/validation/requestFood.schema";
import { createContext, ReactNode, useContext, useState } from "react";

type FoodRequestContextType = {
  data: FoodRequestType | undefined;
  setData: (data: FoodRequestType) => void;
  clearData: () => void;
};

const FoodRequestContext = createContext<FoodRequestContextType | undefined>(
  undefined,
);

export default function FoodRequestContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [foodRequest, setFoodRequest] = useState<FoodRequestType | undefined>(
    undefined,
  );
  const setData = (data: FoodRequestType) => {
    setFoodRequest(data);
  };
  const clearData = () => {
    setFoodRequest(undefined);
  };
  return (
    <FoodRequestContext.Provider
      value={{ data: foodRequest, setData, clearData }}
    >
      {children}
    </FoodRequestContext.Provider>
  );
}

export const useFoodRequestData = () => {
  const ctx = useContext(FoodRequestContext);
  if (!ctx) {
    throw new Error(
      `"useFoodRequestData" should be used inside "FoodRequestContextProvider" component`,
    );
  }
  return ctx;
};
