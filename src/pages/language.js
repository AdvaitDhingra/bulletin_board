import React from "react";
import { Trans, useI18next, Link } from "gatsby-plugin-react-i18next";
import useTranslatedConfig from "../strings";

import Layout from "../components/Layout";
import SEO from "../components/SEO";

import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FlagIconFactory from "react-flag-icon-css";
const CountryFlag = FlagIconFactory(React, { useCssModules: false });

const LanguagePage = () => {
  const translatedStrings = useTranslatedConfig();
  const { t, languages, language } = useI18next();
  return (
    <Layout>
      <SEO
        title={t(`Language selection`)}
        description={t(`Select your language here.`)}
      />
      <Paper
        style={{
          margin: "10% 10% 10% 10%",
          paddingTop: "15px",
          paddingBottom: "15px",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          color="textPrimary"
          variant="h5"
          style={{ fontSize: "46px" }}
        >
          <Trans>Select your langauge</Trans>
        </Typography>
        <Container style={{ display: "flex", justifyContent: "space-around" }}>
          {languages.map((lang) => (
            <Card
              key={lang}
              elevation={lang === language ? 12 : 1}
              variant="elevation"
            >
              <Link
                to="/language"
                language={lang}
                style={{ textDecoration: "none" }}
              >
                <CardContent>
                  <Typography color="textPrimary">
                    {translatedStrings[lang]}
                  </Typography>
                  <CountryFlag code={lang} size="3x" />
                </CardContent>
              </Link>
            </Card>
          ))}
        </Container>
      </Paper>
    </Layout>
  );
};

export default LanguagePage;
