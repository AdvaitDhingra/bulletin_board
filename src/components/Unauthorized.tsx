import React from "react";
//@ts-ignore
import Auth from "../images/auth.svg";
import { Link } from "gatsby";
import Button from "@material-ui/core/Button";
import SEO from "./SEO";
import Typography from "@material-ui/core/Typography";

export default () => (
  <div
    style={{
      margin: "0 10% 25px 10%",
      textAlign: "center",
      justifyContent: "center",
    }}
  >
    <SEO
      title="Unauthorized"
      description="This page is sadly reserved to logged in users. Log in to access it."
    />
    <Typography variant="h1" style={{ fontSize: "46px" }}>
      Unauthorized
    </Typography>
    <Auth style={{ width: "100%", height: "100%", maxWidth: "500px" }} />
    <Typography variant="h3" style={{ fontSize: "26px" }}>
      It seems you are not allowed to be here.
      <br />
      Login or ask an administrator for access.
    </Typography>
    <Link to="/">
      <Button color="primary">Login</Button>
    </Link>
  </div>
);
