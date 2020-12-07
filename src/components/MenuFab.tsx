import React from "react";
import { navigate } from "gatsby";

import makeStyles from "@material-ui/styles/makeStyles";
import type { Theme } from "@material-ui/core";

import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import AddIcon from "@material-ui/icons/Add";
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
  onOpenSettings: () => void;
};

const MenuFab = ({ onNewHomework, onOpenSettings }: Props) => {
  const style = useStyles();
  const [open, setOpen] = React.useState(false);

  return (
    <SpeedDial
      ariaLabel="Menu Icon"
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
        tooltipTitle="Add a new homework"
        onClick={() => {
          setOpen(false);
          onNewHomework();
        }}
      />
      <SpeedDialAction
        key="open-settings"
        icon={<AddIcon />}
        tooltipTitle="Open the settings"
        onClick={() => navigate("/settings")}
      />
    </SpeedDial>
  );
};

export default MenuFab;
