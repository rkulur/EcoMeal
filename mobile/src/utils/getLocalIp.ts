import * as Network from "expo-network";

export default async function getLocalIp() {
  const ip = await Network.getIpAddressAsync();
  console.log("Local IP:", ip);
  return ip;
}
