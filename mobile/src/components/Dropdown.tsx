import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons"; // or "react-native-vector-icons/AntDesign"

interface CarehomeDropdownProps {
  carehomes?: string[];
  onSelect?: (selected: string) => void;
}

const CarehomeDropdown: React.FC<CarehomeDropdownProps> = ({
  carehomes = [
    "Sunrise Care Home",
    "Elder Haven",
    "Golden Age Shelter",
    "Harmony Living",
    "Peaceful Meadows",
  ],
  onSelect,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);

  const toggleDropdown = () => setOpen((prev) => !prev);

  const handleSelect = (item: string) => {
    setSelected(item);
    setOpen(false);
    onSelect?.(item);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity style={styles.header} onPress={toggleDropdown}>
        <Text style={styles.title}>
          {selected ? selected : "Requested carehomes"}
        </Text>
        <AntDesign
          name={open ? "up" : "down"}
          size={20}
          color="#333"
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* Dropdown list */}
      {open && (
        <View style={styles.dropdown}>
          <FlatList
            data={carehomes}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default CarehomeDropdown;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  icon: {
    marginLeft: 8,
  },
  dropdown: {
    backgroundColor: "#fff",
    marginTop: 6,
    borderRadius: 10,
    elevation: 3,
    overflow: "hidden",
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 15,
    color: "#333",
  },
});
