import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

export default ({ children }) => {
  return (
    <List>
      {children.map((child, i) => (
        <ListItem key={i}>{child}</ListItem>
      ))}
    </List>
  );
};
