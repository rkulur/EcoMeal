// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Ensure `.html` is treated as an asset
config.resolver.assetExts.push("html");

module.exports = config;
