import React from "react";
import { graphql } from "gatsby";
import firebase from "gatsby-plugin-firebase";
import { useAuthState } from "../utils/firebase-hooks-gatsby";
import { useI18next, Link, Trans } from "gatsby-plugin-react-i18next";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import LinearProgress from "@material-ui/core/LinearProgress";
import Alert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import MUILink from "@material-ui/core/Link";

import GHIcon from "@material-ui/icons/GitHub";
import AboutIcon from "@material-ui/icons/Help";

import "../css/index.css";

export const query = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        siteName
        schoolShortName
        githubLink
      }
    }
  }
`;

const IndexPage = ({
  data: {
    site: {
      siteMetadata: { siteName, schoolShortName, githubLink },
    },
  },
}) => {
  const { navigate, t } = useI18next();
  const userField = React.useRef();
  const passwordField = React.useRef();
  const [error, setError] = React.useState(null);
  const [user, loading] = useAuthState();
  // If user already logged in redirect
  React.useEffect(() => {
    if (user !== null) navigate("/home");
  }, [user, navigate]);

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
      <SEO
        title={t("Login")}
        description={t(
          `Welcome to {{siteName}}, a place for students of the {{schoolShortName}} to share their homework. ` +
            `Please log in or register before using the services!`,
          { siteName, schoolShortName }
        )}
      />
      {loading ? (
        <LinearProgress />
      ) : (
        <>
          <Typography variant="h3" align="center" color="textPrimary">
            <Trans>
              Welcome to {{ siteName }}! Please log in.
            </Trans>
          </Typography>
          <form className="login" onSubmit={submit}>
            {error && (
              <Alert variant="outlined" severity="error">
                <Trans>Error loging in: {{ error }}</Trans>
              </Alert>
            )}
            <input
              ref={userField}
              type="text"
              placeholder={t("Email adress")}
              className="login_text"
              id="user"
            />
            <input
              ref={passwordField}
              type="password"
              placeholder={t("Password")}
              className="login_text"
              id="password"
            />
            <button className="loginButton" aria-label={t("Login")}>
              <Trans>Login</Trans>
            </button>
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
              <MUILink href={githubLink} target="_blank" rel="noopener">
                <GHIcon color="primary" />
              </MUILink>
              <Link to="/about" state={{ fromSelf: true }}>
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
