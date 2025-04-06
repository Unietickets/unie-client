'use client'

import React from 'react';
import ReactSwitch from 'react-switch';

import { Colors } from '@/shared/constants';

export const Switch = ({ hasError = false, onChange, ref, ...restProps }) => {

  const handleChange = (...args) => {
    onChange?.(...args);
  }

  return (
    <ReactSwitch
      onChange={handleChange}
      ref={ref}
      width={44}
      height={24}
      onColor={Colors.FluorescentOrange}
      offColor={Colors.Mako}
      checkedIcon={false}
      uncheckedIcon={false}
      {...restProps}
    />
  );
}
