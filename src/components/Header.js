import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import firebase from "gatsby-plugin-firebase";
import { useAuthState } from "../utils/firebase-hooks-gatsby";
import Button from "@material-ui/core/Button";

const Header = ({ siteTitle }) => {
  const [user, loading] = useAuthState();

  return (
    <header
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        {!loading && user !== null && (
          <Button
            style={{ float: "right", marginTop: "-35px" }}
            onClick={() => firebase.auth().signOut()}
          >
            Logout
          </Button>
        )}
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
