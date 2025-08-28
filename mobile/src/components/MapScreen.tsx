import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import * as Location from "expo-location";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import {
  LeafletView,
  MapMarker,
  WebviewLeafletMessage,
} from "react-native-leaflet-view";
import Toast from "react-native-toast-message";

type CoordsType = {
  longitude: number;
  latitude: number;
};

interface LocationDetails extends Location.LocationGeocodedAddress {}

type MapScreenProps = {
  locationDetails: LocationDetails | null;
  setLocationDetails: (locationDetails: LocationDetails) => void;
  setCoords?: ({ longitude, latitude }: CoordsType) => void;
  defaultMarker?: { latitude: number; longitude: number };
};

export default function MapScreen({
  locationDetails,
  setLocationDetails,
  setCoords,
  defaultMarker,
}: MapScreenProps) {
  const [webViewContent, setWebViewContent] = useState<string | null>(null);

  const [marker, setMarker] = useState<MapMarker>({
    id: "user-marker",
    position: { lat: 0, lng: 0 },
    icon: "📍",
    size: [34, 34],
    iconAnchor: [16, 32],
    title: "",
  });

  const handleMessage = useCallback((msg: WebviewLeafletMessage) => {
    if (msg.event === "onMapClicked" && msg.payload?.touchLatLng) {
      const { lat, lng } = msg.payload.touchLatLng;
      setMarker((prev) => ({
        ...prev,
        position: { lat, lng },
        title: locationDetails?.formattedAddress ?? "",
      }));
    }
  }, []);

  const injectedJS = `
    document.addEventListener("DOMContentLoaded", () => {
      if (typeof map !== 'undefined') {
        map.on('click', (e) => {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            event: 'onMapClicked',
            payload: { touchLatLng: { lat: e.latlng.lat, lng: e.latlng.lng } }
          }));
        });
      }
    });
    true;
  `;

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
    let isMounted = true;

    const setDefaultLocation = async () => {
      try {
        const ok = await requestPermission();
        if (!ok) return;
        if (defaultMarker) {
          setMarker((prev) => ({
            ...prev,
            position: {
              lat: defaultMarker.latitude,
              lng: defaultMarker.longitude,
            },
          }));
          return;
        }
        const actualLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        const { longitude, latitude } = actualLocation.coords;

        setMarker((prev) => ({
          ...prev,
          position: { lat: latitude, lng: longitude },
          title: locationDetails?.formattedAddress ?? "",
        }));
        setCoords && setCoords({ latitude, longitude });
      } catch (e) {
        console.error(e);
      }
    };

    const loadHtml = async () => {
      try {
        const path = require("../../assets/leaflet.html");
        const asset = Asset.fromModule(path);
        await asset.downloadAsync();
        const htmlContent = await FileSystem.readAsStringAsync(asset.localUri!);

        if (isMounted) {
          setWebViewContent(htmlContent);
        }
      } catch (error) {
        Alert.alert("Error loading HTML", JSON.stringify(error));
        console.error("Error loading HTML:", error);
      }
    };

    setDefaultLocation();
    loadHtml();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let timeout = setTimeout(() => {
      (async () => {
        try {
          const ok = await requestPermission();
          if (!ok) return;
          const { lat: latitude, lng: longitude } = marker.position;
          const [address] = await Location.reverseGeocodeAsync({
            latitude,
            longitude,
          });
          setLocationDetails(address);
          setCoords && setCoords({ latitude, longitude });
        } catch (e) {
          console.error(e);
        }
      })();
    }, 500);

    return () => clearTimeout(timeout);
  }, [marker]);

  if (!webViewContent) {
    return <ActivityIndicator size="large" />;
  }
  return (
    <View style={s.container}>
      <LeafletView
        source={{ html: webViewContent }}
        mapCenterPosition={marker ? marker.position : { lat: 0, lng: 0 }}
        injectedJavaScript={injectedJS}
        onMessageReceived={handleMessage}
        zoom={marker ? 26 : 2}
        mapMarkers={marker ? [marker] : []}
        onError={(error) => console.warn("WebView error:", error.nativeEvent)}
      />
    </View>
  );
}
const s = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  infoContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    width: "100%",
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  infoText: {
    color: "#fff",
    textAlign: "center",
  },
});
