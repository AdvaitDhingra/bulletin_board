import React, { useState } from "react";
import { Trans, useTranslation } from "gatsby-plugin-react-i18next";
import firebase from "gatsby-plugin-firebase";
import usePermissions from "../utils/usePermissions";

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
  courseName: string;
  subCourseName: string;
};

const NewHomeworkDialog = ({ onClose, courseName, subCourseName }: Props) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const permissions = usePermissions();
  const homeworksRef =
    permissions === null
      ? null
      : firebase
          .firestore()
          .collection("classes")
          .doc(permissions.className)
          .collection("courses")
          .doc(courseName)
          .collection("subCourses")
          .doc(subCourseName || "default")
          .collection("homeworks");

  function submit() {
    if (homeworksRef !== null)
      homeworksRef
        .doc(slugify(title))
        .set(
          {
            title: title,
            content: content,
            startDate: currentDate,
            dueDate: dueDate,
          },
          { merge: true }
        )
        .then(onClose);
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Dialog open onClose={onClose}>
        <DialogTitle>
          <Trans>New Homework</Trans>
        </DialogTitle>
        <DialogContent>
          <Grid container direction="row" justify="space-between">
            <TextField
              // eslint-disable-next-line
              autoFocus
              margin="dense"
              label={t("Title")}
              type="text"
              fullWidth
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              margin="dense"
              label={t("Content")}
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
          <Button onClick={onClose}>
            <Trans>Cancel</Trans>
          </Button>
          <Button
            onClick={submit}
            disabled={title.length === 0 || content.length === 0}
            color="primary"
          >
            <Trans>Add</Trans>
          </Button>
        </DialogActions>
      </Dialog>
    </MuiPickersUtilsProvider>
  );
};

export default NewHomeworkDialog;
