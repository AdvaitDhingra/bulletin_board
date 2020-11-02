import React, { useState } from "react";

import firebase from "gatsby-plugin-firebase";

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

const Homework = ({ title, content, docSlug, id }) => {
  const maxSize = 250;
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card style={{ marginBottom: "5px" }} variant="outlined">
        <CardContent>
          <IconButton
            onClick={() => {
              firebase
                .firestore()
                .collection("homework")
                .doc(docSlug)
                .get()
                .then((e) => {
                  const data = e.data();
                  delete data[id];
                  firebase
                    .firestore()
                    .collection("homework")
                    .doc(docSlug)
                    .set(data);
                });
            }}
            style={{ float: "right" }}
          >
            <DeleteIcon />
          </IconButton>
          <h3>{title}</h3>
          <p>{content.substring(0, maxSize)}</p>
        </CardContent>
        {content.length > maxSize && (
          <CardActions>
            <Button onClick={() => setOpen(true)}>Read more...</Button>
          </CardActions>
        )}
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)} className = "readmore">
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
