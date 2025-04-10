import { Colors } from '../../constants';

export const getCustomTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    danger: Colors.VividOrange,
    dangerLight: Colors.SalmonBuff,
    primary: Colors.FluorescentOrange,
    primary25: Colors.FluorescentOrange,
    primary50: Colors.NeonLight,
    primary75: Colors.OldYella,
    neutral20: Colors.FluorescentOrange,
    neutral80: Colors.Black,
  },
});

const SelectVariants = {
  Outlined: {
    borderRadius: '15px',
  },
  Round: {
    borderRadius: '40px',
  },
};

const getBorderColor = (defaultColor, { hasError, isDisabled }) => {
  if (hasError) {
    return Colors.VividOrange;
  }

  if (isDisabled) {
    return Colors.TitaniumWhite;
  }

  return defaultColor;
};

export const CUSTOM_STYLES = {
  container: (baseStyles) => ({
    ...baseStyles,
    width: '100%',
  }),
  control: (baseStyles, props) => {
    const { isDisabled, selectProps } = props;
    const { variant = 'Outlined' } = selectProps;

    return {
      ...baseStyles,
      fontSize: '16px',
      lineHeight: '1em',
      color: Colors.White,

      padding: '5px',

      borderWidth: '1px',
      borderColor: getBorderColor(Colors.OldYella, selectProps),
      boxShadow: 'none',
      backgroundColor: isDisabled ? Colors.GreyShingle : Colors.Nero,
      ...SelectVariants[variant],
      '&:hover': {
        cursor: 'pointer',
      },
    };
  },
  valueContainer: (baseStyles) => ({
    ...baseStyles,
    padding: '4px 12px',
  }),
  dropdownIndicator: (baseStyles, { selectProps }) => ({
    ...baseStyles,
    color: Colors.Dull,
    transform: selectProps.menuIsOpen ? 'rotate(180deg)' : '',
    '&:hover': {
      color: Colors.Dull,
    },
  }),
  indicatorSeparator: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: Colors.Dull,
  }),
  indicatorsContainer: (baseStyles) => ({
    ...baseStyles,
    marginRight: '16px',
  }),
  groupHeading: (baseStyles) => ({
    ...baseStyles,
    padding: '0 16px 8px',
    color: Colors.Dull,
  }),
  option: (baseStyles, { isSelected }) => ({
    ...baseStyles,
    padding: '8px 16px',
    backgroundColor: Colors.Carbon,
    color: Colors.White,
    '&:hover': {
      backgroundColor: Colors.Mako,
    },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '15px',
    boxShadow: '0px 1px 26px 0px rgba(0, 0, 0, 0.10)',
    zIndex: 11,
    overflow: 'hidden',
  }),
};
