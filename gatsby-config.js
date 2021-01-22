module.exports = {
  siteMetadata: {
    siteName: `FEG Board`,
    author: `Advait Dhingra & Arthur Pacaud`,
    schoolName: "Friedrich-Ebert-Gymnasium Bonn",
    schoolShortName: "FEG",
    siteUrl: `https://feg-boards.netlify.app/`,
    githubLink: `https://github.com/AdvaitDhingra/bulletin_board`,
    googleSiteVerification: `SPe1RGF_Ex23b_1nhORjCEWcO771TP6KshYM6hup_N8`,
  },
  pathPrefix: "/",
  plugins: [
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        path: `${__dirname}/locales`,
        languages: [`us`, `de`, `fr`],
        defaultLanguage: `us`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `locales`,
        path: `${__dirname}/locales`,
      },
    },
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
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        exclude: ["/**/404", "/**/404.html"],
        query: `
            {
              site {
                siteMetadata {
                  siteUrl
                }
              }
              allSitePage(filter: {context: {i18n: {routed: {eq: false}}}}) {
                edges {
                  node {
                    context {
                      i18n {
                        defaultLanguage
                        languages
                        originalPath
                      }
                    }
                    path
                  }
                }
              }
            }
          `,
        serialize: ({ site, allSitePage }) => {
          return allSitePage.edges.map((edge) => {
            const {
              languages,
              originalPath,
              defaultLanguage,
            } = edge.node.context.i18n;
            const { siteUrl } = site.siteMetadata;
            const url = siteUrl + originalPath;
            const links = [
              { lang: defaultLanguage, url },
              { lang: "x-default", url },
            ];
            languages.forEach((lang) => {
              if (lang === defaultLanguage) return;
              links.push({ lang, url: `${siteUrl}/${lang}${originalPath}` });
            });
            return {
              url,
              changefreq: "daily",
              priority: 1.0,
              links,
            };
          });
        },
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
  ],
};
