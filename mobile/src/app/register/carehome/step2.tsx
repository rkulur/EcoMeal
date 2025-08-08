import {
  BottomUpModal,
  InputBox,
  MapComponent,
  PoppinsText,
} from "@/src/components";
import StepButtons from "@/src/core/auth/components/RegisterButton";
import RegistrationStepSkeleton from "@/src/core/auth/components/StepSkeleton";
import { useStep2CarehomeData } from "@/src/core/auth/hooks/carehome/step2Context";
import { BORDER_RADIUS, COLORS } from "@/src/themes";
import { step2Schema } from "@/src/validation/register/carehome/carehomeRegistration.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm, useFormState } from "react-hook-form";
import { Alert, Pressable, StyleSheet, View } from "react-native";
import { z } from "zod";

type step2Type = z.infer<typeof step2Schema>;
const CarehomeRegistrationStep2 = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<step2Type>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      location: {
        state: "Karnataka",
        district: "Dakshina Kannada",
        city: "Mangalore",
        pincode: "575000",
      },
    },
  });

  const { data, setData } = useStep2CarehomeData();
  const router = useRouter();

  const onSubmit = (data: step2Type) => {
    setData(data);
    router.push("/register/carehome/step3");
  };

  const [showMap, setShowMap] = useState(false);
  const [locationDetails, setLocationDetails] =
    useState<Location.LocationGeocodedAddress | null>(null);

  useEffect(() => {
    if (locationDetails) {
      const data = {
        location: {
          state: locationDetails.region!,
          district: locationDetails.district!,
          city: locationDetails.city!,
          pincode: locationDetails.postalCode!,
        },
      };
      reset(data);
    }
  }, [locationDetails, reset]);
  return (
    <RegistrationStepSkeleton
      totalSteps={4}
      currStep={2}
      heading="Where can we reach you?"
    >
      <View>
        <Pressable
          style={({ pressed }) => [s.btn, { opacity: pressed ? 0.8 : 1 }]}
          onPress={() => setShowMap(true)}
        >
          <PoppinsText>Select in Map</PoppinsText>
        </Pressable>
      </View>
      <BottomUpModal isVisible={showMap} setIsVisible={setShowMap}>
        <MapComponent
          locationDetails={locationDetails}
          setLocationDetails={setLocationDetails}
        />
      </BottomUpModal>
      <Controller
        control={control}
        render={function ({ field: { value, onChange } }) {
          return (
            <InputBox label={"State"} value={value} onChangeText={onChange} />
          );
        }}
        name={"location.state"}
      />
      {errors.location?.state && (
        <PoppinsText>{errors.location?.state.message}</PoppinsText>
      )}
      <Controller
        control={control}
        render={function ({ field: { value, onChange } }) {
          return (
            <InputBox
              label={"District"}
              value={value}
              onChangeText={onChange}
            />
          );
        }}
        name={"location.district"}
      />
      {errors.location?.district && (
        <PoppinsText>{errors.location?.district.message}</PoppinsText>
      )}
      <Controller
        control={control}
        render={function ({ field: { value, onChange } }) {
          return (
            <InputBox label={"City"} value={value} onChangeText={onChange} />
          );
        }}
        name={"location.city"}
      />
      {errors.location?.city && (
        <PoppinsText>{errors.location?.city.message}</PoppinsText>
      )}
      <Controller
        control={control}
        render={function ({ field: { value, onChange } }) {
          return (
            <InputBox
              label={"Pincode"}
              value={value}
              onChangeText={onChange}
              keyboardType="name-phone-pad"
            />
          );
        }}
        name={"location.pincode"}
      />
      {errors.location?.pincode && (
        <PoppinsText>{errors.location?.pincode.message}</PoppinsText>
      )}
      <StepButtons
        totalSteps={3}
        currStep={2}
        onPress={handleSubmit(onSubmit, (err) => alert(JSON.stringify(err)))}
      />
    </RegistrationStepSkeleton>
  );
};

export default CarehomeRegistrationStep2;

const s = StyleSheet.create({
  btn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: BORDER_RADIUS,
    boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
    flex: 1,
    paddingVertical: 10,
  },
});
