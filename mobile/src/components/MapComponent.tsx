import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT, UrlTile } from "react-native-maps";
import Toast from "react-native-toast-message";

type MapComponentProps = {
  locationDetails: Location.LocationGeocodedAddress | null;
  setLocationDetails: (
    locationDetails: Location.LocationGeocodedAddress,
  ) => void;
  setCoords?: ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => void;
};
const MapComponent = ({
  locationDetails,
  setLocationDetails,
  setCoords,
}: MapComponentProps) => {
  const [region, setRegion] = useState({
    latitude: 12.915605,
    longitude: 74.855965,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [marker, setMarker] = useState({
    latitude: 12.915605,
    longitude: 74.855965,
  });

  async function requestPermission() {
    if (Platform.OS !== "web") {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "error",
          text1: "Permisssion needed",
          text2: "We need location permissions to show your address",
        });
        return false;
      }
    }
    return true;
  }

  useEffect(() => {
    (async () => {
      try {
        const ok = await requestPermission();
        if (!ok) return;
        const actualLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        const { latitude, longitude } = actualLocation.coords;
        setMarker({ latitude, longitude });
        setCoords && setCoords({ latitude, longitude });
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  useEffect(() => {
    let timeout = setTimeout(() => {
      (async () => {
        try {
          const ok = await requestPermission();
          if (!ok) return;
          const [address] = await Location.reverseGeocodeAsync(marker);
          setLocationDetails(address);
        } catch (e) {
          console.error(e);
        }
      })();
    }, 500);

    return () => clearTimeout(timeout);
  }, [marker]);

  return (
    <View style={s.view}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={s.map}
        initialRegion={region}
        onRegionChangeComplete={setRegion}
        onPress={(e) => setMarker(e.nativeEvent.coordinate)}
        mapType="none"
      >
        <UrlTile
          urlTemplate="http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg"
          maximumZ={19}
          shouldReplaceMapContent={true}
        />
        <Marker
          coordinate={marker}
          draggable
          title={locationDetails?.street || ""}
          description={locationDetails?.formattedAddress || ""}
          tracksViewChanges={false}
        />
      </MapView>
    </View>
  );
};

export default MapComponent;

const s = StyleSheet.create({
  view: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
