import React from "react";
import { useI18next } from "gatsby-plugin-react-i18next";
import firebase from "gatsby-plugin-firebase";

import makeStyles from "@material-ui/styles/makeStyles";
import type { Theme } from "@material-ui/core";

import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import AddIcon from "@material-ui/icons/Add";
import SettingsIcon from "@material-ui/icons/Settings";
import AboutIcon from "@material-ui/icons/HelpOutline";
import CloseIcon from "@material-ui/icons/Close";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

const useStyles = makeStyles((theme: Theme) => ({
  speedDial: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

type Props = {
  onNewHomework: () => void;
};

const MenuFab = ({ onNewHomework }: Props) => {
  const { navigate, t } = useI18next();
  const style = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <SpeedDial
      ariaLabel={t("Menu Icon")}
      icon={
        <SpeedDialIcon icon={<ExpandLessIcon />} openIcon={<CloseIcon />} />
      }
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      direction="up"
      className={style.speedDial}
    >
      <SpeedDialAction
        key="new-note"
        icon={<AddIcon />}
        tooltipTitle={t("Add a new homework")}
        onClick={() => {
          setOpen(false);
          onNewHomework();
        }}
      />
      <SpeedDialAction
        key="open-settings"
        icon={<SettingsIcon />}
        tooltipTitle={t("Open the settings")}
        onClick={() => navigate("/settings")}
      />
      <SpeedDialAction
        key="logout"
        icon={<CloseIcon />}
        tooltipTitle={t("Log out")}
        onClick={() => {
          firebase.auth().signOut();
          navigate("/");
        }}
      />
      <SpeedDialAction
        key="about"
        icon={<AboutIcon />}
        tooltipTitle={t("About this website")}
        onClick={() => navigate("/about", { state: { fromSelf: true } })}
      />
    </SpeedDial>
  );
};

export default MenuFab;
