'use client'

import AsyncSelect from 'react-select/async';
import { mergeStyles } from 'react-select';
import React from 'react';

import { CUSTOM_STYLES, getCustomTheme } from './Select.styles';

export const SelectAsync = (props) => {
  const { styles } = props;

  return (
    <AsyncSelect
      theme={getCustomTheme}
      {...props}
      styles={mergeStyles(CUSTOM_STYLES, styles)}
    />
  );
};
