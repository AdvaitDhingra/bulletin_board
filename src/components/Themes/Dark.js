import { createMuiTheme, lighten, darken } from "@material-ui/core/styles";

const nord4 = "#D8DEE9";
const nord5 = "#E5E9F0";
const nord6 = "#ECEFF4";
const nord8 = "#88C0D0";
const nord9 = "#81A1C1";
const nord11 = "#BF616A";
const nord12 = "#D08770";
const nord13 = "#EBCB8B";
const nord14 = "#A3BE8C";
const backgroundColor = "#2E3440";
const canvasColor = "#3B4252";

const Dark = createMuiTheme({
  palette: {
    type: "dark",
    common: { black: "rgba(110, 42, 42, 1)", white: "#fff" },
    background: {
      paper: canvasColor,
      default: backgroundColor,
    },
    primary: {
      light: lighten(nord8, 0.05),
      main: nord8,
      dark: darken(nord8, 0.05),
      contrastText: backgroundColor,
    },
    secondary: {
      light: lighten(nord6, 0.05),
      main: nord6,
      dark: darken(nord6, 0.05),
      contrastText: canvasColor,
    },
    text: {
      primary: nord6,
      secondary: nord5,
      disabled: nord4,
      hint: nord5,
    },
    error: {
      light: lighten(nord11, 0.05),
      main: nord11,
      dark: darken(nord11, 0.05),
      contrastText: backgroundColor,
    },
    warning: {
      light: lighten(nord12, 0.05),
      main: nord12,
      dark: darken(nord12, 0.05),
      contrastText: backgroundColor,
    },
    info: {
      light: lighten(nord13, 0.05),
      main: nord13,
      dark: darken(nord13, 0.05),
      contrastText: backgroundColor,
    },
    success: {
      light: lighten(nord14, 0.05),
      main: nord14,
      dark: darken(nord14, 0.05),
      contrastText: backgroundColor,
    },
  },
  overrides: {
    MuiTypography: {
      h6: {
        // Make h6, used in Drawer title bars, use the same weight as tabs and mosaic windows
        fontWeight: 400,
      },
    },
    MuiListItem: {
      secondaryAction: {
        paddingRight: 40,
      },
      gutters: {
        paddingRight: 8,
      },
    },
    MuiListItemSecondaryAction: {
      root: {
        right: 8,
      },
    },
    MuiInput: {
      input: {
        padding: 0,
        paddingBottom: 3,
      },
      underline: {
        "&:before": {
          borderBottom: `1px solid ##D8DEE9`,
        },
      },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: nord8,
      },
    },
    MuiIconButton: {
      root: {
        color: "#D8DEE9",
      },
    },
    MuiListItemIcon: {
      root: {
        color: "#D8DEE9",
      },
    },
    // Use a more visible color scheme for tabs:
    MuiTabs: {
      root: {
        backgroundColor: nord9,
        minHeight: 32, // Reduce the height of tabs to 32px
      },
    },
    MuiTab: {
      textColorPrimary: {
        color: "#ECEFF4 !important",
      },
      root: {
        // Reduce the height of tabs to 32px
        paddingTop: 0,
        paddingBottom: 0,
        minHeight: 32,
      },
    },
    MuiButtonBase: {
      // Remove the web-ish "pointer" (hand) cursor from buttons
      root: {
        cursor: "default",
      },
    },
    // Reduce default margins on tables:
    MuiTableCell: {
      sizeSmall: {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
    // Reduce default margins on Dialogs:
    MuiDialogTitle: {
      root: {
        padding: 8,
      },
    },
    MuiDialogContent: {
      root: {
        padding: 8,
      },
    },
    // Remove default margins on form controls (we already use a Grid)
    MuiFormControl: {
      marginDense: {
        marginTop: 0,
        marginBottom: 0,
      },
    },
    MuiCheckbox: {
      root: {
        // Cancel padding around Checkbox
        marginTop: -9,
        marginBottom: -9,
      },
    },
    // Use non rounded buttons
    MuiButton: {
      root: {
        borderRadius: 0,
        fontWeight: 400, // Lower a bit the weight of buttons
      },
    },
  },
});

export default Dark;
