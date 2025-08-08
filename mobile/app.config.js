import "dotenv/config";
import os from "os";

function getLocalIP() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const ni of nets[name]) {
      if (ni.family === "IPv4" && !ni.internal) {
        console.log(ni.address);
        return ni.address;
      }
    }
  }
  return null;
}

const ip = getLocalIP();
const apiUrl = ip
  ? `http://${ip}:3000/api/v1`
  : process.env.EXPO_PUBLIC_API_BASE_URL || "http://localhost:3000/api/v1";

export default {
  expo: {
    name: "mobile",
    slug: "ecomeal-app",
    scheme: "ecomeal",
    android: { package: "com.example.ecomeal" },
    ios: { bundleIdentifier: "com.example.ecomeal" },
    extra: {
      apiUrl,
      ...process.env,
    },
  },
};
