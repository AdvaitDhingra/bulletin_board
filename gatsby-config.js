const { render } = require("mustache");

module.exports = {
  siteMetadata: {
    siteName: `FEG Board`,
    description: `This website has been created by {{author}} for the {{schoolName}}. Here, students and teachers can share homework, or use other scholar tools.`,
    author: `Advait Dhingra and Arthur Pacaud`,
    schoolName: "Friedrich-Ebert-Gymnasium Bonn",
    schoolShortName: "FEG",
    siteUrl: `https://feg-boards.netlify.app/`,
    githubLink: `https://github.com/AdvaitDhingra/bulletin_board`,
    googleSiteVerification: `SPe1RGF_Ex23b_1nhORjCEWcO771TP6KshYM6hup_N8`,
  },
  pathPrefix: "/",
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `FEG Board`,
        short_name: `Homeworks`,
        start_url: `/home`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-theme-material-ui`,
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: "AIzaSyDqcl7gDUaSFuqGSObgU1O3R4HtAwvubnU",
          authDomain: "homework-e9969.firebaseapp.com",
          databaseURL: "https://homework-e9969.firebaseio.com",
          projectId: "homework-e9969",
          storageBucket: "homework-e9969.appspot.com",
          messagingSenderId: "871520598838",
          appId: "1:871520598838:web:79f75461caab638caa1197",
          measurementId: "G-3KNZKXXYPZ",
        },
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
  ],
};

module.exports.siteMetadata.description = render(
  module.exports.siteMetadata.description,
  module.exports.siteMetadata
);
