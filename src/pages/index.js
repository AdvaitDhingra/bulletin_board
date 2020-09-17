import React from "react";

import firebase from "gatsby-plugin-firebase";
import { useAuthState } from "../utils/firebase-hooks-gatsby";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import LinearProgress from "@material-ui/core/LinearProgress";
import Alert from "@material-ui/lab/Alert";

import "../css/index.css";

const IndexPage = () => {
  const userField = React.useRef();
  const passwordField = React.useRef();
  const [error, setError] = React.useState(null);
  const [user, loading] = useAuthState();
  // If user already logged in redirect
  React.useEffect(() => {
    if (user !== null) document.location.href = "/home";
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
        <form className="login" onSubmit={submit}>
          {error && (
            <Alert variant="outlined" severity="error">
              Error loging in: {error}
            </Alert>
          )}
          <input
            ref={userField}
            type="text"
            placeholder="Benutzername"
            className="login_text"
            id="user"
          />
          <input
            ref={passwordField}
            type="text"
            placeholder="Kennwort"
            className="login_text"
            id="password"
          />
          <button className="loginButton">Login</button>
        </form>
      )}
    </Layout>
  );
};

export default IndexPage;
