import React from 'react';

export const IndicatorsContainer = ({ children, ...props }) => {
  return (
    <div {...props}>
      {children}
    </div>
  );
};
