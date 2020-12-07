import React from "react";

import Layout from "../components/Layout";
import SEO from "../components/SEO";

const AboutPage = () => (
  <Layout>
    <SEO title="About this site" />
    <h2>
      <span role="img" aria-label="Waving hand emoji">
        👋
      </span>{" "}
      Hello there!
    </h2>
    <p>
      This site has been created by Arthur Pacaud and Advait Dhingra for the
      Friedrich-Eberyt-Gymnasium Bonn. Here, Students can share their homework.
      This site is open source, check it out on{" "}
      <a
        href="https://github.com/AdvaitDhingra/bulletin_board"
        referrerPolicy="noreferrer"
      >
        Github
      </a>
      !
    </p>
  </Layout>
);

export default AboutPage;
