export const GRADIENT_PRIMARY = ["#B38FE6", "#783FC9"] as const;
export const GRADIENT_SECONDARY = ["#FFFFFFCC", "#E9E9F6CC"] as const;
export const GRADIENT_SECONDARY_REVERSED = ["#E9E9F6CC", "#FFFFFFCC"] as const;

export const COLORS = {
  gray: "#D9D9D9",
  white: "white",
  purple: "#783FC9",
  outlineGray: "#D2D2D2",
  hoverGray: "#F2F2F2",
  green: "#56C747",
  red: "#D02626",
  bgGreen: "#EBFFE8",
  lightGray: "#FBFCFD",
  blue: "#0078D4",
};

export const STATUS_COLORS = {
  pending: { color: "#E6B000", bg: "#FFF8E3" },
  accepted: { color: "#0078D4", bg: "#E6F2FF" },
  assigned: { color: "#009688", bg: "#E0F7F4" },
  picked_up: { color: "#FF8C00", bg: "#FFEFD5" },
  delivered: { color: "#56C747", bg: "#EAFFE7" },
  expired: { color: "#A1893F", bg: "#FFF8E3" },
  cancelled: { color: "#D02626", bg: "#FFC1C1" },
  available: { color: "#56C747", bg: "#EAFFE7" },
  requested: { color: "#E6B000", bg: "#FFF8E3" },
  approved: { color: "#56C747", bg: "#EAFFE7" },
  rejected: { color: "#D02626", bg: "#FFC1C1" },
};
export const SPACING = {
  page: 24,
  cardHorizontal: 22,
  cardVertical: 28,
};
export const FONT_SIZE = {
  xlarge: 27,
  large: 22,
  xmedium: 18,
  medium: 16,
  small: 14,
  xsmall: 10,
  xxlarge: 32,
};

export const FONT = {
  REGULAR: "Poppins_400Regular",
  BOLD: "Poppins_700Bold",
  SEMI_BOLD: "Poppins_600SemiBold",
};

export const HEIGHT = {
  button: 40,
  tabBar: 70,
  progressBar: 5,
  donorStep: 40,
  input: 50,
};

export const LINE_HEIGHT = {
  heading: 35,
  impactCard: 28,
};

export const BORDER_RADIUS = 8;
