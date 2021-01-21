import React from "react";

import Layout from "../components/Layout";
import SEO from "../components/SEO";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Link from "@material-ui/core/Link";

const AboutPage = () => (
  <Layout>
    <SEO title="About this site" />
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" color="textPrimary">
        <span role="img" aria-label="Waving hand emoji">
          👋
        </span>{" "}
        Hello there!
      </Typography>
      <Typography align="center" color="textSecondary">
        This website has been created by Arthur Pacaud and Advait Dhingra for
        the Friedrich-Ebert-Gymnasium Bonn. Here, Students can share their
        homework. This website is open source, check it out on{" "}
        <Link
          href="https://github.com/AdvaitDhingra/bulletin_board"
          target="_blank"
          rel="noopener"
        >
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
        if (window && window.history) window.history.back();
      }}
    >
      <ArrowBackIcon />
    </Fab>
  </Layout>
);

export default AboutPage;
