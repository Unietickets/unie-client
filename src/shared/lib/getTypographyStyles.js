const Variant = {
    h1: 'h1',
    h1: 'h2',
    h1: 'h3',
    h1: 'h4',
    body: 'body',
    body2: 'body2',
    caption1: 'caption1',
    caption2: 'caption2',
    caption3: 'caption3'
};

export const getTypographyStyles = (variant) => {
  switch (variant) {
    case 'h1':
      return `
        font-style: normal;
        font-weight: 700;
        font-size: 48px;
        line-height: 48px;
      `;

    case 'h2':
      return `
        font-style: normal;
        font-weight: 600;
        font-size: 42px;
        line-height: 42px;
      `;

    case 'h3':
      return `
        font-style: normal;
        font-weight: 500;
        font-size: 30px;
        line-height: 39px;
      `;

    case 'h4':
      return `
        font-style: normal;
        font-weight: 600;
        font-size: 32px;
        line-height: 35px;
      `;

    case 'body':
      return `
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        line-height: 34px;
      `;

    case 'body2':
      return `
        font-style: normal;
        font-weight: 400;
        font-size: 22px;
        line-height: 31px;
      `;

    case 'caption':
      return `
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
      `;

    case 'caption2':
      return `
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 26px;
      `;

    case 'caption3':
      return `
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 21px;
      `;

    default:
      return '';
  }
};
