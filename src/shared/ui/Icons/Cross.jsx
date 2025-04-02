import { Colors } from "@/shared/constants";
import React from "react";

export const Cross = ({ width = 24, height = 24, color = Colors.SmokedSalmon, ...rest }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" {...rest}>
      <path
        d="M14.544 12L18.78 16.236L16.236 18.78L12 14.544L7.75201 18.792L5.20801 16.248L9.45601 12L5.20801 7.75201L7.75201 5.20801L12 9.45601L16.248 5.22001L18.792 7.76401L14.544 12Z"
        fill={color}
      />
    </svg>
  );
};