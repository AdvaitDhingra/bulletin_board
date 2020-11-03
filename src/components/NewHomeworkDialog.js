import React, { useState } from "react";

import firebase from "gatsby-plugin-firebase";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import slugify from "slugify";

const NewHomeworkDialog = ({ onClose, doc }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function submit() {
    const homework = {};
    homework[slugify(title)] = {
      title: title,
      content: content,
      returnTime: Date.now() + 5000,
    };

    firebase
      .firestore()
      .collection("homework")
      .doc(doc)
      .set(homework, { merge: true })
      .then(onClose);
  }

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>New Homework</DialogTitle>
      <DialogContent>
        <TextField
          // eslint-disable-next-line
          autoFocus
          margin="dense"
          label="Title"
          type="text"
          fullWidth
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Content"
          type="textarea"
          fullWidth
          multiline
          rows={4}
          onChange={(e) => setContent(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={submit}
          disabled={title.length === 0 || content.length === 0}
          color="primary"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewHomeworkDialog;
