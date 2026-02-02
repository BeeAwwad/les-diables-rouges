import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 56,
  height: 56,
};
export const contentType = "image/png";

const Icon = () => {
  return new ImageResponse(
    <div
      style={{
        fontSize: 24,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#eef2f3",
        color: "#8B0105",
        borderRadius: "20%",
      }}
    >
      LDR
    </div>,
    {
      ...size,
    },
  );
};

export default Icon;
