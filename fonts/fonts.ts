import {
  Poppins,
  Abril_Fatface,
  Dela_Gothic_One,
  Silkscreen,
} from "next/font/google";

export const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin-ext"],
});

export const abrilFatface = Abril_Fatface({
  weight: ["400"],
  subsets: ["latin-ext"],
});

export const delaGothicOne = Dela_Gothic_One({
  weight: ["400"],
  subsets: ["latin-ext"],
});

export const silkscreen = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin-ext"],
});
