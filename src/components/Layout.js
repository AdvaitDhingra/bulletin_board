/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import Header from "./Header";
import Unauthorized from "../components/Unauthorized";
import { useAuthState } from "../utils/firebase-hooks-gatsby";
import "../css/layout.css";

const Layout = ({ children, authRequired }) => {
  const [user, loading] = useAuthState();

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  console.log(authRequired, user, loading);

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <main>
        {authRequired && user === null && !loading ? (
          <Unauthorized />
        ) : (
          children
        )}
      </main>
      <footer className="footer">
        © {new Date().getFullYear()},{" "}
        <a href="mailto:dhingra.co.in" className="Name">
          Advait Dhingra
        </a>{" "}
        &{" "}
        <a href="https://github.com/arthuro555" className="Name">
          Arthur Pacaud
        </a>
      </footer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  authRequired: PropTypes.bool,
};

export default Layout;
