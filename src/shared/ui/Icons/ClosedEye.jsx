import React from "react";

import { Colors } from "@/shared/constants";

export const ClosedEye = ({ width = 24, height = 24, color = Colors.DhusarGrey, ...rest }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" {...rest}>
      <path d="M21.0686 9.25781C21.72 9.84067 22.2686 10.4064 22.68 10.8521C22.9643 11.1671 23.1217 11.5763 23.1217 12.0007C23.1217 12.425 22.9643 12.8342 22.68 13.1492C20.88 15.0864 16.7829 18.8578 12 18.8578H11.3143" stroke={color} stroke-width="1.71429" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6.63428 17.3654C4.64851 16.2533 2.85423 14.8294 1.31999 13.1483C1.0357 12.8333 0.878326 12.424 0.878326 11.9997C0.878326 11.5754 1.0357 11.1662 1.31999 10.8511C3.11999 8.91401 7.21714 5.14258 12 5.14258C13.8853 5.18198 15.7305 5.69485 17.3657 6.63401" stroke={color} stroke-width="1.71429" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M21.4286 2.57129L2.57143 21.4284" stroke={color} stroke-width="1.71429" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9.58286 14.417C8.93899 13.777 8.57525 12.9077 8.57143 11.9999C8.57143 11.0905 8.93265 10.2185 9.57563 9.57549C10.2186 8.93251 11.0907 8.57129 12 8.57129C12.9078 8.57512 13.7771 8.93885 14.4171 9.58272" stroke={color} stroke-width="1.71429" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14.9829 13.7139C14.6777 14.2355 14.24 14.6673 13.7143 14.9653" stroke={color} stroke-width="1.71429" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
};
