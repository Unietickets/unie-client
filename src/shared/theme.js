import { Colors } from "@/shared/constants";

const darkTheme = {
  primary: Colors.FluorescentOrange,
  secondary: Colors.UclaGold,
  text: {
    primary: Colors.Doctor,
    secondary: Colors.Mako,
  },
  border: Colors.Doctor,
};

const lightTheme = {
  primary: Colors.FluorescentOrange,
  secondary: Colors.UclaGold,
  text: {
    primary: Colors.Black,
    secondary: Colors.Carbon,
  },
  border: Colors.Doctor,
};

export const theme = {
  light: lightTheme,
  dark: darkTheme,
}
