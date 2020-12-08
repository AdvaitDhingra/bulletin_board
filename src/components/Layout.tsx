/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import { useAuthState } from "../utils/firebase-hooks-gatsby";

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

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <ThemeProvider theme={theme}>
      <div
        className="fill-window"
        style={{ backgroundColor: theme.palette.background.default }}
      >
        <Header
          siteTitle={data.site.siteMetadata.title}
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
            © {new Date().getFullYear()},{" "}
            <Link href="mailto:dhingra.co.in">Advait Dhingra</Link> &{" "}
            <Link href="https://github.com/arthuro555">Arthur Pacaud</Link>
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
