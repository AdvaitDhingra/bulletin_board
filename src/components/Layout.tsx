import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import { useAuthState } from "../utils/firebase-hooks-gatsby";
import { Trans, useTranslation } from "gatsby-plugin-react-i18next";

import Header from "./Header";
import Unauthorized from "./Unauthorized";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import Light from "./Themes/Light";
import Dark from "./Themes/Dark";
import { ThemeProvider } from "@material-ui/core/styles";

import "../css/layout.css";

type Props = {
  children: React.ReactChildren;
  authRequired: boolean;
};

const Layout = ({ children, authRequired }: Props) => {
  const { t } = useTranslation();
  const [user, loading] = useAuthState();
  const [dark, setDark] = React.useState(
    globalThis === globalThis.window
      ? window.localStorage.getItem("IsDark") === "true"
      : false
  );
  const theme = dark ? Dark : Light;

  if (globalThis === globalThis.window) {
    React.useEffect(
      () => window.localStorage.setItem("IsDark", dark ? "true" : "false"),
      [dark]
    );
  }

  const {
    site: {
      siteMetadata: { siteName },
    },
  } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          siteName
        }
      }
    }
  `);

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          backgroundColor: theme.palette.background.default,
          position: "absolute",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <Header
          siteTitle={siteName}
          titleRedirect={user ? "/home" : "/"}
          setDark={setDark}
          dark={dark}
        />
        <main>
          {authRequired && user === null && !loading ? (
            <Unauthorized />
          ) : (
            children
          )}
        </main>
        <div style={{ marginTop: "33px" }} />
        <footer className="footer">
          <Typography variant="subtitle2" color="textPrimary" align="center">
            <Trans>
              Made with{" "}
              <span role="img" aria-label={t("love")}>
                💖
              </span>{" "}
              by <Link href="mailto:dhingra.co.in">Advait Dhingra</Link> &{" "}
              <Link href="https://github.com/arthuro555">Arthur Pacaud</Link>
            </Trans>
          </Typography>
        </footer>
      </div>
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  authRequired: PropTypes.bool,
};

export default Layout;
