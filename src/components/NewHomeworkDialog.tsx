import React, { useState } from "react";

import firebase from "gatsby-plugin-firebase";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";

import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

import slugify from "slugify";

type Props = {
  onClose: () => void;
  doc: string;
};

const NewHomeworkDialog = ({ onClose, doc }: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());

  function submit() {
    const homework = {};
    homework[slugify(title)] = {
      title: title,
      content: content,
      startDate: currentDate,
      returnDate: dueDate,
    };

    firebase
      .firestore()
      .collection("homework")
      .doc(doc)
      .set(homework, { merge: true })
      .then(onClose);
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Dialog open onClose={onClose}>
        <DialogTitle>New Homework</DialogTitle>
        <DialogContent>
          <Grid container direction="row" justify="space-between">
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
            <DatePicker value={currentDate} onChange={setCurrentDate} />
            <DatePicker value={dueDate} onChange={setDueDate} />
          </Grid>
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
    </MuiPickersUtilsProvider>
  );
};

export default NewHomeworkDialog;
