import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import List from "../components/List";

const ToggelableMenu = ({ children, title }) => {
  return (
    <Accordion>
      <AccordionSummary>{title}</AccordionSummary>
      <AccordionDetails>
        <List>{children}</List>
      </AccordionDetails>
    </Accordion>
  );
};

export default ToggelableMenu;
