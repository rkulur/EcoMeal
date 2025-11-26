import { LinearGradient } from "expo-linear-gradient";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import PoppinsText from "./PoppinsText";
import { COLORS, GRADIENT_PRIMARY, HEIGHT } from "../themes";
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Icon = keyof typeof Ionicons.glyphMap;
type TabBarProps = BottomTabBarProps & {
  iconNames: [Icon, Icon, Icon, Icon];
};
export default function TabBar({
  state,
  descriptors,
  navigation,
  iconNames,
}: TabBarProps) {
  const capitalize = (str: string) => str[0].toUpperCase() + str.substring(1);
  const insets = useSafeAreaInsets();
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          height: HEIGHT.tabBar + insets.bottom,
          paddingBottom: insets.bottom,
          overflow: "hidden",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0px -4px 6px rgba(0,0,0,0.1)",
          backgroundColor: COLORS.white,
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? capitalize(options.title)
                : capitalize(route.name);

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              Haptics.selectionAsync();
              navigation.navigate(route.name);
            }
          };

          const isFirstTab = index === 0;
          const isLastTab = index === state.routeNames.length - 1;

          const normalTab = () => (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                width: 100,
              }}
            >
              <Ionicons
                name={
                  (iconNames[index] +
                    (isFocused
                      ? ""
                      : "-outline")) as keyof typeof Ionicons.glyphMap
                }
                size={24}
                color={isFocused ? "white" : "black"}
              />
              <PoppinsText
                style={{
                  color: isFocused ? "white" : "black",
                  fontSize: 12,
                }}
              >
                {label as string}
              </PoppinsText>
            </View>
          );

          const gradientTab = () => (
            <LinearGradient
              colors={GRADIENT_PRIMARY}
              style={{
                flex: 1,
                borderTopRightRadius: isFirstTab
                  ? 30
                  : !isFirstTab && !isLastTab
                    ? 5
                    : 0,
                borderTopLeftRadius: isLastTab
                  ? 30
                  : !isFirstTab && !isLastTab
                    ? 5
                    : 0,
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {normalTab()}
            </LinearGradient>
          );

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isFocused ? gradientTab() : normalTab()}
            </TouchableOpacity>
          );
        })}
      </View>
      {/* <View style={{ height: 40 }}></View> */}
    </>
  );
}
