module.exports = {
  siteMetadata: {
    title: `Bulletin Board`,
    description: `A Board with homework.`,
    author: `@AdvaitDhingra & @arthuro555`,
  },
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
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `bulletin board`,
        short_name: `bb`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
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
  ],
};
