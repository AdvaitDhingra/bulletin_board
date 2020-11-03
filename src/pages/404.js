import React from "react";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import NotFound from "../images/notFound.svg";

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <div
      style={{
        margin: "0 10% 25px 10%",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <h1 style={{ fontSize: "46px" }}>Not Found</h1>
      <NotFound style={{ width: "100%", height: "100%" }} />
    </div>
  </Layout>
);

export default NotFoundPage;
