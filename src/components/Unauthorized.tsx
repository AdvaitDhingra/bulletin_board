import React from "react";
import { Link, Trans, useTranslation } from "gatsby-plugin-react-i18next";

//@ts-ignore
import Auth from "../images/auth.svg";
import Button from "@material-ui/core/Button";
import SEO from "./SEO";
import Typography from "@material-ui/core/Typography";

export default () => {
  const { t } = useTranslation();
  return (
    <div
      style={{
        margin: "0 10% 25px 10%",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <SEO
        title={t("Unauthorized")}
        description={t(
          "This page is sadly reserved to logged in users. Log in to access it."
        )}
      />
      <Typography variant="h1" style={{ fontSize: "46px" }}>
        <Trans>Unauthorized</Trans>
      </Typography>
      <Auth style={{ width: "100%", height: "100%", maxWidth: "500px" }} />
      <Typography variant="h3" style={{ fontSize: "26px" }}>
        <Trans>
          It seems you are not allowed to be here.
          <br />
          Login or ask an administrator for access.
        </Trans>
      </Typography>
      <Link to="/">
        <Button color="primary">Login</Button>
      </Link>
    </div>
  );
};
