export const TYPOGRAPHY = {
    h1: 'h1',
    h2: 'h2',
    body: 'body',
    body2: 'body2',
};

export const getTypographyStyles = (variant) => {
  switch (variant) {
    case 'h1':
      return `
        font-style: normal;
        font-weight: 700;
        font-size: 32px;
        line-height: 40px;
      `;

    case 'h2':
      return `
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 32px;
      `;

    case 'body':
      return `
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
      `;

    case 'body2':
      return `
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
      `;

    default:
      return '';
  }
};
