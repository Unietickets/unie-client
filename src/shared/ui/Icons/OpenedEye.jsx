import React from "react";

import { Colors } from "@/shared/constants";

export const OpenedEye = ({ width = 24, height = 24, color = Colors.DhusarGrey, ...rest }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" {...rest}>
      <path d="M22.68 10.8511C22.9643 11.1662 23.1217 11.5754 23.1217 11.9997C23.1217 12.424 22.9643 12.8333 22.68 13.1483C20.88 15.0854 16.7829 18.8569 12 18.8569C7.21714 18.8569 3.11999 15.0854 1.31999 13.1483C1.0357 12.8333 0.878326 12.424 0.878326 11.9997C0.878326 11.5754 1.0357 11.1662 1.31999 10.8511C3.11999 8.91401 7.21714 5.14258 12 5.14258C16.7829 5.14258 20.88 8.91401 22.68 10.8511Z" stroke={color} stroke-width="1.71429" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 15.4284C13.8936 15.4284 15.4286 13.8934 15.4286 11.9999C15.4286 10.1063 13.8936 8.57129 12 8.57129C10.1065 8.57129 8.57144 10.1063 8.57144 11.9999C8.57144 13.8934 10.1065 15.4284 12 15.4284Z" stroke={color} stroke-width="1.71429" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
};
