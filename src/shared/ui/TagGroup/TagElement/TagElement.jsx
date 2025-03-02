import React from 'react';

import * as Styles from './TagElement.styles';

export const TagElement = ({ children, isActive, onClick }) => {
  return (
    <Styles.TagListElement>
      <Styles.TagContent
        isActive={isActive}
        onClick={onClick}
        size="small"
      >
        {children}
      </Styles.TagContent>
    </Styles.TagListElement>
  );
};
