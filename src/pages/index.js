import React from "react";

import firebase from "gatsby-plugin-firebase";
import { useAuthState } from "../utils/firebase-hooks-gatsby";
import { navigate, Link } from "gatsby";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import LinearProgress from "@material-ui/core/LinearProgress";
import Alert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";

import GHIcon from "@material-ui/icons/GitHub";
import AboutIcon from "@material-ui/icons/Help";

import "../css/index.css";

const IndexPage = () => {
  const userField = React.useRef();
  const passwordField = React.useRef();
  const [error, setError] = React.useState(null);
  const [user, loading] = useAuthState();
  // If user already logged in redirect
  React.useEffect(() => {
    if (user !== null) navigate("/home");
  }, [user]);

  function submit(e) {
    e.preventDefault();

    if (userField.current !== null && passwordField.current !== null)
      firebase
        .auth()
        .signInWithEmailAndPassword(
          userField.current.value,
          passwordField.current.value
        )
        .catch((authError) => setError(authError.message));
  }

  return (
    <Layout>
      <SEO title="Login" />
      {loading ? (
        <LinearProgress />
      ) : (
        <>
          <Typography variant="h3" align="center" color="textPrimary">
            Welcome to FEG Boards! Please log in.
          </Typography>
          <form className="login" onSubmit={submit}>
            {error && (
              <Alert variant="outlined" severity="error">
                Error loging in: {error}
              </Alert>
            )}
            <input
              ref={userField}
              type="text"
              placeholder="E-Mail adresse"
              className="login_text"
              id="user"
            />
            <input
              ref={passwordField}
              type="password"
              placeholder="Kennwort"
              className="login_text"
              id="password"
            />
            <button className="loginButton">Login</button>
          </form>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "200px",
              }}
            >
              <a
                href="https://github.com/AdvaitDhingra/bulletin_board"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GHIcon color="primary" />
              </a>
              <Link to="/about">
                <AboutIcon color="primary" />
              </Link>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default IndexPage;
