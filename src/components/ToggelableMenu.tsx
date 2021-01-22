import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import List from "./List";

type Props = {
  children: JSX.Element;
  title: JSX.Element;
};

const ToggelableMenu = ({ children, title }: Props) => {
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
