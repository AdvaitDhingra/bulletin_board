import React from "react";

import Layout from "../components/Layout";
import SEO from "../components/SEO";

import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const AboutPage = () => (
  <Layout>
    <SEO title="About this site" />
    <Container maxWidth="sm">
      <h2>
        <span role="img" aria-label="Waving hand emoji">
          👋
        </span>{" "}
        Hello there!
      </h2>
      <p>
        This site has been created by Arthur Pacaud and Advait Dhingra for the
        Friedrich-Eberyt-Gymnasium Bonn. Here, Students can share their
        homework. This site is open source, check it out on{" "}
        <a
          href="https://github.com/AdvaitDhingra/bulletin_board"
          referrerPolicy="noreferrer"
        >
          Github
        </a>
        !
      </p>
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
