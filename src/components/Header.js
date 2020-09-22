import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

import firebase from "gatsby-plugin-firebase";
import { useAuthState } from "../utils/firebase-hooks-gatsby";
import Fab from "@material-ui/core/Fab";
import Exit from "@material-ui/icons/MeetingRoom";

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
            to="/home"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        {!loading && user !== null && (
          <Fab
            color="secondary"
            variant="extended"
            style={{ float: "right", marginTop: "-45px" }}
            onClick={() => firebase.auth().signOut()}
          >
            <Exit style={{ marginRight: "5px" }} />
            Logout
          </Fab>
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
