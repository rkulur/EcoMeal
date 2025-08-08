import { PoppinsText } from "@/src/components";
import { BORDER_RADIUS, COLORS, GRADIENT_PRIMARY, HEIGHT } from "@/src/themes";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, View } from "react-native";

type FilterTabsProps<T extends string> = {
  filters: readonly T[];
  currFilter: T;
  setCurrFilter: (filter: T) => void;
};
function FilterTabs<T extends string>({
  filters,
  currFilter,
  setCurrFilter,
}: FilterTabsProps<T>) {
  return (
    <View style={s.container}>
      <View style={{ gap: 3, flexDirection: "row", flex: 1 }}>
        {filters.map((filter, idx) => {
          if (filter === currFilter) {
            return (
              <Pressable style={s.field} key={idx}>
                <LinearGradient colors={GRADIENT_PRIMARY} style={s.field}>
                  <PoppinsText style={{ color: "white" }}>{filter}</PoppinsText>
                </LinearGradient>
              </Pressable>
            );
          }
          return (
            <Pressable
              style={s.field}
              key={idx}
              onPress={() => setCurrFilter(filter)}
            >
              <PoppinsText>{filter}</PoppinsText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default FilterTabs;

const s = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS,
    height: HEIGHT.input,
    backgroundColor: COLORS.hoverGray,
    padding: 5,
  },
  field: {
    borderRadius: BORDER_RADIUS,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: "100%",
  },
});
