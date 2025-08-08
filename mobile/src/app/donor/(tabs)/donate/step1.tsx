import { PoppinsText } from "@/src/components";
import GradientButton from "@/src/components/GradientButton";
import StepButtons from "@/src/core/auth/components/RegisterButton";
import HeadingWithSubtext from "@/src/core/donor/components/HeadingWithSubtext";
import FoodItemForm from "@/src/core/donor/components/donate/FoodItemForm";
import DonationStepSkeleton from "@/src/core/donor/components/donate/StepSkeleton";
import { useStep1DonationData } from "@/src/core/donor/hooks/donate/step1Context";
import {
  BORDER_RADIUS,
  COLORS,
  FONT,
  GRADIENT_SECONDARY,
  GRADIENT_SECONDARY_REVERSED,
  SPACING,
} from "@/src/themes";
import { Step1Schema, step1Type } from "@/src/validation/donate.schema";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Alert, StyleSheet, View } from "react-native";

const DonationStep1 = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Step1Schema),
    defaultValues: {
      foodItems: [
        {
          name: "",
          unit: "plates",
          quantity: 1,
          expiryDate: new Date(),
        },
      ],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "foodItems",
  });

  const router = useRouter();

  const handleFoodItemRemoval = (idx: number) => {
    Alert.alert(
      `Delete Item ${idx + 1}`,
      "Are you sure you want to delete this item?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => remove(idx),
        },
      ],
    );
  };

  const { setData } = useStep1DonationData();
  const onSubmit = (data: step1Type) => {
    setData(data);
    router.push("/donor/donate/step2");
  };

  return (
    <DonationStepSkeleton currStep={1}>
      <View style={s.container}>
        <HeadingWithSubtext
          heading="Describe your Donation"
          subheading="Tell us about the food you'd like to donate"
        />
        <View>
          <PoppinsText style={{ fontFamily: FONT.SEMI_BOLD }}>
            Food Items
          </PoppinsText>
          <View style={{ gap: 10 }}>
            {fields.map((field, idx) => (
              <Controller
                key={field.id}
                control={control}
                name={`foodItems.${idx}`}
                render={({ field: { value, onChange } }) => (
                  <FoodItemForm
                    foodItem={value}
                    count={idx + 1}
                    onChange={onChange}
                    remove={() => {
                      handleFoodItemRemoval(idx);
                    }}
                    errors={errors}
                  />
                )}
              />
            ))}
            <GradientButton
              gradient={GRADIENT_SECONDARY_REVERSED}
              text="Add Item"
              onPress={() =>
                append({
                  name: "",
                  quantity: 1,
                  unit: "plates",
                  expiryDate: new Date(),
                })
              }
            >
              <Ionicons name="add" size={20} />
            </GradientButton>
          </View>
        </View>
        <StepButtons
          totalSteps={4}
          currStep={1}
          onPress={handleSubmit(onSubmit, (err) => console.error(err))}
        />
      </View>
    </DonationStepSkeleton>
  );
};

export default DonationStep1;

const s = StyleSheet.create({
  container: {
    marginTop: SPACING.page,
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.cardHorizontal,
    paddingVertical: SPACING.cardVertical,
    borderRadius: BORDER_RADIUS,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
    gap: 15,
  },
  subcontainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 30,
  },
  circle: {
    height: 5,
    width: 5,
    backgroundColor: "black",
    borderRadius: 99999999,
  },
});
