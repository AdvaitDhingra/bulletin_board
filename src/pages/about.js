import React from "react";
import { navigate, graphql } from "gatsby";

import Layout from "../components/Layout";
import SEO from "../components/SEO";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Link from "@material-ui/core/Link";

export const query = graphql`
  query AboutPageQuery {
    site {
      siteMetadata {
        siteName
        description
        githubLink
      }
    }
  }
`;

const AboutPage = ({
  location: { state },
  data: {
    site: {
      siteMetadata: { siteName, description, githubLink },
    },
  },
}) => {
  return (
    <Layout>
      <SEO
        title="About this site"
        description={`Learn more about ${siteName}.`}
      />
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" color="textPrimary">
          <span role="img" aria-label="Waving hand emoji">
            👋
          </span>{" "}
          Hello there!
        </Typography>
        <Typography align="center" color="textSecondary">
          {description} This website is open source, check it out on{" "}
          <Link href={githubLink} target="_blank" rel="noopener">
            GitHub
          </Link>
          !
        </Typography>
      </Container>
      <Fab
        color="secondary"
        aria-label="return-back"
        style={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
        }}
        onClick={() => {
          if (window && window.history && state && state.fromSelf)
            window.history.back();
          else navigate("/");
        }}
      >
        <ArrowBackIcon />
      </Fab>
    </Layout>
  );
};

export default AboutPage;
