import isPropValid from '@emotion/is-prop-valid'

export function shouldForwardProp(propName, target) {
  if (typeof target === "string") {
      return isPropValid(propName);
  }
  return true;
}
