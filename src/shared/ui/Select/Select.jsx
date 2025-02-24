'use client'

import ReactSelect, { mergeStyles } from 'react-select';
import React from 'react';

import { CUSTOM_STYLES, getCustomTheme } from './Select.styles';
import { IndicatorsContainer } from './components/IndicatorsContainer';

export const Select = (props) => {
  const { styles, variant = 'Outlined', components } = props;

  return (
    <ReactSelect
      theme={getCustomTheme}
      {...props}
      components={{
        IndicatorsContainer,
        ...components,
      }}
      variant={variant}
      styles={mergeStyles(CUSTOM_STYLES, styles)}
    />
  );
};
