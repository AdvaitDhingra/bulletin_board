import PropTypes from "prop-types";
import React from "react";
import { Link, useTranslation, Trans } from "gatsby-plugin-react-i18next";

import type { Theme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import makeStyles from "@material-ui/styles/makeStyles";
import { darken } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import LanguageIcon from "@material-ui/icons/Language";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    background:
      theme.palette.type === "dark"
        ? darken(theme.palette.primary.dark, 0.05)
        : `rebeccapurple`,
    marginBottom: `1.45rem`,
  },
}));

type Props = {
  siteTitle: string;
  titleRedirect: string;
  setDark: (dark: boolean) => void;
  dark: boolean;
};

const Header = ({ siteTitle, titleRedirect, setDark, dark }: Props) => {
  const style = useStyles();
  const { t } = useTranslation();

  return (
    <header className={style.header}>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to={titleRedirect}
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        <div />
        <div />
        <div>
          <FormControlLabel
            control={
              <Switch
                checked={dark}
                onChange={(e) => setDark(e.target.checked)}
                name={t("Dark Mode")}
                color="primary"
              />
            }
            label={
              <Typography color="textPrimary">
                <Trans>Dark Mode</Trans>
              </Typography>
            }
          />
          <Link to="/language">
            <Tooltip
              title={t("Language selection")}
              PopperProps={{ style: { marginTop: "-12px" } }}
              arrow
            >
              <IconButton>
                <LanguageIcon color="inherit" />
              </IconButton>
            </Tooltip>
          </Link>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
