import React from "react";

import Skeleton from "@material-ui/lab/Skeleton";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

export default () => (
  <Card style={{ marginBottom: "5px" }} variant="outlined">
    <CardContent>
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </CardContent>
  </Card>
);
