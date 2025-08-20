import { InputBox, PoppinsHeadText } from "@/src/components";
import GradientButton from "@/src/components/GradientButton";
import PageHeader from "@/src/components/PageHeader";
import StepButtons from "@/src/core/auth/components/RegisterButton";
import { postRequestDonation as postDonationRequest } from "@/src/core/carehome/api";
import RequestFoodForm from "@/src/core/carehome/components/RequestFoodForm";
import { useFoodRequestData } from "@/src/core/carehome/hooks/requestFoodContext";
import { GRADIENT_SECONDARY_REVERSED, HEIGHT, SPACING } from "@/src/themes";
import {
  FoodRequestSchema,
  FoodRequestType,
} from "@/src/validation/requestFood.schema";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  GestureResponderEvent,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Requests = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FoodRequestSchema),
    defaultValues: {
      requestedItems: [
        {
          name: "",
          unit: "plates",
          quantity: 1,
        },
      ],
    },
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "requestedItems",
  });

  const router = useRouter();

  const { setData } = useFoodRequestData();

  const onSubmit = async (data: FoodRequestType) => {
    setData(data);
    const res = await postDonationRequest(data);
    if (!res.ok) {
      alert(res.error.message);
      return;
    }
    alert("Food requested successfully!");
    router.navigate("/carehome/dashboard");
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <PageHeader />
      <ScrollView
        style={s.container}
        contentContainerStyle={{ paddingBottom: HEIGHT.tabBar + SPACING.page }}
      >
        <PoppinsHeadText style={{ textAlign: "center" }}>
          Request Food
        </PoppinsHeadText>
        <View style={{ gap: 10 }}>
          {fields.map((field, idx) => (
            <Controller
              key={field.id}
              control={control}
              name={`requestedItems.${idx}`}
              render={({ field: { value, onChange } }) => (
                <>
                  <RequestFoodForm
                    requestedItem={value}
                    count={idx + 1}
                    onChange={onChange}
                    remove={() => {
                      remove(idx);
                    }}
                    errors={errors}
                  />
                </>
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
              })
            }
          >
            <Ionicons name="add" size={20} />
          </GradientButton>
          <Controller
            control={control}
            name={`comments`}
            render={({ field: { value, onChange } }) => (
              <InputBox
                label={"Comments"}
                onChangeText={(text) => onChange(text)}
              />
            )}
          />
          <StepButtons
            totalSteps={1}
            currStep={1}
            onPress={handleSubmit(onSubmit, (err) => console.error(err))}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Requests;

const s = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.page,
    paddingTop: SPACING.page,
    height: "100%",
    padding: 20,
  },
});
