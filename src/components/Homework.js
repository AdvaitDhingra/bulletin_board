import React, { useState } from "react";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import Button from "@material-ui/core/Button";

const Homework = ({ title, content }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <h3>{title}</h3>
          <p>{content.substring(0, 40)}</p>
        </CardContent>
        {content.length > 40 && (
          <CardActions>
            <Button onClick={() => setOpen(true)}>Read more...</Button>
          </CardActions>
        )}
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <p>{content}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Homework;
