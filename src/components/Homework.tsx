import React, { useState } from "react";
import { Trans } from "gatsby-plugin-react-i18next";

import HomeworkData, { isHomeworkData } from "../types/HomeworkData";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Slide from "@material-ui/core/Slide";

type Props = {
  id: string;
  timeout: number;
  homework: HomeworkData;
  onDelete: () => void;
};

const Homework = ({ id, timeout, homework, onDelete }: Props) => {
  const { title, content, startDate, dueDate } = homework;
  const maxSize = 250;
  const [open, setOpen] = useState(false);

  if (!isHomeworkData(homework))
    return (
      <Slide in direction="right" timeout={timeout * 200}>
        <Card style={{ marginBottom: "5px" }} variant="outlined">
          <CardContent>
            <p style={{ fontSize: "16px", color: "red" }}>
              <Trans>
                Invalid Homework. Please report this error to a developer.
              </Trans>
            </p>
          </CardContent>
        </Card>
      </Slide>
    );

  const startDateString = startDate.toDate().toLocaleDateString("de");
  const dueDateString = dueDate.toDate().toLocaleDateString("de");
  const dates = (
    <Trans>
      From: {{ startDateString }}, To: {{ dueDateString }}
    </Trans>
  );

  return (
    <>
      <Slide in direction="right" timeout={timeout * 200}>
        <Card style={{ marginBottom: "5px" }} variant="outlined">
          <CardContent>
            <IconButton onClick={() => onDelete()} style={{ float: "right" }}>
              <DeleteIcon />
            </IconButton>
            <h3>{title}</h3>
            <article>{content.substring(0, maxSize)}</article>
            <footer>{dates}</footer>
          </CardContent>
          {content.length > maxSize && (
            <CardActions>
              <Button onClick={() => setOpen(true)}>
                <Trans>Read more...</Trans>
              </Button>
            </CardActions>
          )}
        </Card>
      </Slide>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <article>{content}</article>
          <footer>{dates}</footer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            <Trans>Close</Trans>
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Homework;
