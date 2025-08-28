import { BottomUpModal, InputBox, PoppinsText } from "@/src/components";
import MapScreen from "@/src/components/MapScreen";
import StepButtons from "@/src/core/auth/components/RegisterButton";
import SelectDate from "@/src/core/donor/components/donate/SelectDate";
import DonationStepSkeleton from "@/src/core/donor/components/donate/StepSkeleton";
import HeadingWithSubtext from "@/src/core/donor/components/HeadingWithSubtext";
import { useStep2DonationData } from "@/src/core/donor/hooks/donate/step2Context";
import { BORDER_RADIUS, COLORS, SPACING } from "@/src/themes";
import { Step2Schema, step2Type } from "@/src/validation/donate.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, View } from "react-native";
import { z } from "zod";

type Step2Type = z.infer<typeof Step2Schema>;

const DonationStep2 = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Step2Type>({
    resolver: zodResolver(Step2Schema),
    defaultValues: {
      pickupAddress: {
        address: "",
        landmark: "",
      },
      pickupTimePreference: new Date(),
    },
  });
  const [showMap, setShowMap] = useState(false);

  type NewType = Location.LocationGeocodedAddress;
  const [locationDetails, setLocationDetails] = useState<NewType | null>(null);
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const router = useRouter();
  const { setData } = useStep2DonationData();

  const onSubmit = (data: step2Type) => {
    setData(data);
    router.push("/donor/donate/step3");
  };

  useEffect(() => {
    if (locationDetails) {
      const data = {
        pickupAddress: {
          address: locationDetails.formattedAddress!,
          landmark: "",
        },
        pickupTimePreference: new Date(),
        locationGeo: {
          type: "Point",
          coordinates: coords ? [coords.longitude, coords.latitude] : [0, 0],
        },
      };
      reset(data);
    }
  }, [locationDetails, reset, coords]);
  return (
    <DonationStepSkeleton currStep={2}>
      <View style={s.container}>
        <HeadingWithSubtext
          heading="Where can we collect it?"
          subheading="Provide details about the pickup location"
        />
        <View>
          <Pressable
            style={({ pressed }) => [s.btn, { opacity: pressed ? 0.8 : 1 }]}
            onPress={() => setShowMap(true)}
          >
            <PoppinsText>Select in Map</PoppinsText>
          </Pressable>
        </View>
        <BottomUpModal isVisible={showMap} setIsVisible={setShowMap}>
          <MapScreen
            locationDetails={locationDetails}
            setLocationDetails={setLocationDetails}
            setCoords={setCoords}
          />
        </BottomUpModal>
        <Controller
          control={control}
          name="pickupAddress.address"
          render={({ field: { value, onChange } }) => (
            <InputBox
              label="Address"
              onChangeText={(text) => onChange(text)}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="pickupAddress.landmark"
          render={({ field: { value, onChange } }) => (
            <InputBox
              label="Landmark (Optional)"
              onChangeText={(text) => onChange(text)}
              value={value}
            />
          )}
        />
        <Controller
          control={control}
          name="pickupTimePreference"
          render={({ field: { value, onChange } }) => (
            <View>
              <PoppinsText>Preferred Pickup Time</PoppinsText>
              <View>
                <SelectDate
                  defaultDate={value!}
                  onChange={(date) => onChange(date)}
                  mode="datetime"
                />
              </View>
            </View>
          )}
        />
        <StepButtons
          totalSteps={4}
          currStep={3}
          onPress={handleSubmit(onSubmit, (err) => console.error(err))}
        />
      </View>
    </DonationStepSkeleton>
  );
};

export default DonationStep2;

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
  btn: {
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
