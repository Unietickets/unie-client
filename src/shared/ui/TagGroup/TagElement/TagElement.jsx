import React from 'react';

import * as Styles from './TagElement.styles';
import { TAG_VARIANTS } from '../constants';

export const TagElement = ({
  children,
  isActive,
  isAccent,
  onClick,
  variant = TAG_VARIANTS.DEFAULT
}) => {
  return (
    <Styles.TagListElement>
      <Styles.TagContent
        isActive={isActive}
        isAccent={isAccent}
        onClick={onClick}
        size="small"
        variant={variant}
      >
        {children}
      </Styles.TagContent>
    </Styles.TagListElement>
  );
};
