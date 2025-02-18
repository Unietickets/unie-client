import { Colors } from "@/shared/constants";

const darkTheme = {
  primary: Colors.FluorescentOrange,
  secondary: Colors.UclaGold,
  text: {
    primary: Colors.Doctor,
    secondary: Colors.Mako,
  },
  border: Colors.Mako,
  background: Colors.Carbon,
};

const lightTheme = {
  primary: Colors.FluorescentOrange,
  secondary: Colors.UclaGold,
  text: {
    primary: Colors.Black,
    secondary: Colors.Carbon,
  },
  border: Colors.Doctor,
  background: Colors.TitaniumWhite,
};

export const theme = {
  light: lightTheme,
  dark: darkTheme,
}
