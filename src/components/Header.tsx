import { Link, navigate } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import makeStyles from "@material-ui/styles/makeStyles";
import { darken } from "@material-ui/core/styles";
import type { Theme } from "@material-ui/core";

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
        <FormControlLabel
          control={
            <Switch
              checked={dark}
              onChange={(e) => setDark(e.target.checked)}
              name="Dark Mode"
              color="primary"
            />
          }
          label="Dark Mode"
        />
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
