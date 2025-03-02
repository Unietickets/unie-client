import React from "react";

import { Colors } from "@/shared/constants";

export const Arrow = ({ width = 10, height = 19, color = Colors.FluorescentOrange, ...rest }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 10 19" fill="none" {...rest}>
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.04099 10.0627L3.56253 14.5412L2.44312 13.4218L6.36187 9.50301L2.44312 5.58426L3.56253 4.46484L8.04099 8.9433C8.1894 9.09176 8.27278 9.29309 8.27278 9.50301C8.27278 9.71293 8.1894 9.91426 8.04099 10.0627Z"
        fill={color}
      />
    </svg>
  );
};
