import { InputBox, PoppinsText } from "@/src/components";
import BottomUpModal from "@/src/components/BottomUpModal";
import MapScreen from "@/src/components/MapScreen";
import StepButtons from "@/src/core/auth/components/RegisterButton";
import RegistrationStepSkeleton from "@/src/core/auth/components/StepSkeleton";
import { useStep2DonorData } from "@/src/core/auth/hooks/donor/step2Context";
import { BORDER_RADIUS, COLORS } from "@/src/themes";
import { step2Schema } from "@/src/validation/register/donor/donorRegistration.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, View } from "react-native";
import { z } from "zod";

type step2Type = z.infer<typeof step2Schema>;
const DonorRegistrationStep2 = () => {
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

  const { data, setData } = useStep2DonorData();
  const router = useRouter();

  const onSubmit = (data: step2Type) => {
    setData(data);
    router.push("/register/donor/step3");
  };

  const [showMap, setShowMap] = useState(false);
  const [locationDetails, setLocationDetails] =
    useState<Location.LocationGeocodedAddress | null>(null);
  const [editStateField, setEditStateField] = useState(false);
  const [editDistrictField, setEditDistrictField] = useState(false);
  const [editCityField, setEditCityField] = useState(false);
  const [editPincodeField, setEditPincodeField] = useState(false);

  useEffect(() => {
    if (locationDetails) {
      const data = {
        location: {
          state: locationDetails.region!,
          district: locationDetails.subregion!,
          city: locationDetails.city!,
          pincode: locationDetails.postalCode!,
        },
      };
      reset(data);
      if (!locationDetails.region) setEditStateField(true);
      if (!locationDetails.subregion) setEditDistrictField(true);
      if (!locationDetails.city) setEditCityField(true);
      if (!locationDetails.postalCode) setEditPincodeField(true);
    }
  }, [locationDetails, reset]);
  return (
    <RegistrationStepSkeleton
      totalSteps={3}
      currStep={2}
      heading="Where can we find you?"
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
        <MapScreen
          setLocationDetails={setLocationDetails}
          locationDetails={locationDetails}
        />
      </BottomUpModal>
      <Controller
        control={control}
        render={function ({ field: { value, onChange } }) {
          return (
            <Pressable
              onPress={() => {
                if (editStateField === false) {
                  setShowMap(true);
                }
              }}
            >
              <InputBox
                label={"State"}
                value={value}
                onChangeText={onChange}
                canEdit={editStateField}
              />
            </Pressable>
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
            <Pressable
              onPress={() => {
                if (editDistrictField === false) {
                  setShowMap(true);
                }
              }}
            >
              <InputBox
                label={"District"}
                value={value}
                onChangeText={onChange}
                canEdit={editDistrictField}
              />
            </Pressable>
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
            <Pressable
              onPress={() => {
                if (editCityField === false) {
                  setShowMap(true);
                }
              }}
            >
              <InputBox
                label={"City"}
                value={value}
                onChangeText={onChange}
                canEdit={editCityField}
              />
            </Pressable>
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
            <Pressable
              onPress={() => {
                if (editPincodeField === false) {
                  setShowMap(true);
                }
              }}
            >
              <InputBox
                label={"Pincode"}
                value={value}
                onChangeText={onChange}
                keyboardType="name-phone-pad"
                canEdit={editPincodeField}
              />
            </Pressable>
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

export default DonorRegistrationStep2;

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
