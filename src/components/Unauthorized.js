import React from "react";
import Auth from "../images/auth.svg";
import { Link } from "gatsby";
import Button from "@material-ui/core/Button";
import SEO from "./SEO";

export default () => (
  <div
    style={{
      margin: "0 10% 25px 10%",
      textAlign: "center",
      justifyContent: "center",
    }}
  >
    <SEO title="Unauthorized" description="This page is sadly reserved to logged in users. Log in to access it." />
    <h1 style={{ fontSize: "46px" }}>Unauthorized</h1>
    <Auth style={{ width: "100%", height: "100%" }} />
    <h3>
      It seems you are not allowed to be here. Login or request access by the
      admins.
    </h3>
    <Link to="/">
      <Button color="primary">Login</Button>
    </Link>
  </div>
);
