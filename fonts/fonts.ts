import { Abril_Fatface, Poppins } from "next/font/google";

export const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin-ext"],
});

export const abrilFatface = Abril_Fatface({
  weight: ["400"],
  subsets: ["latin-ext"],
});
