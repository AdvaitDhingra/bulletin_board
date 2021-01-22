import React from "react";
import { Trans, useTranslation } from "gatsby-plugin-react-i18next";

import Layout from "../components/Layout";
import SEO from "../components/SEO";

import Typography from "@material-ui/core/Typography";

import NotFound from "../images/notFound.svg";

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <SEO
        title={t(`404: Not found`)}
        description={t(`The page you are trying to access does not exist.`)}
      />
      <div
        style={{
          margin: "0 10% 25px 10%",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          color="textPrimary"
          variant="h5"
          style={{ fontSize: "46px" }}
        >
          <Trans>Not Found</Trans>
        </Typography>
        <NotFound style={{ width: "100%", height: "100%" }} />
      </div>
    </Layout>
  );
};

export default NotFoundPage;
