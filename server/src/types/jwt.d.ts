export interface JwtPayload {
  id: string;
  role: "donor" | "ngo" | "carehome" | "admin";
  email: string;
}
