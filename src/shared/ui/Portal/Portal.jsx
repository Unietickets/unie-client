import { createPortal } from 'react';

export const Portal = (props) => {
  const {
    children,
    target = document.body,
  } = props;

  return createPortal(children, target);
};
