import React from "react";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";

//@ts-ignore ts-2307
import Students from "../../images/students.svg";
//@ts-ignore ts-2307
import Teacher from "../../images/teacher.svg";

const useStyles = makeStyles(() => ({
  card: {
    maxHeight: "500px",
    maxWidth: "400px",
  },
  svgImage: { height: "200px", width: "200px" },
}));

type Group = "student" | "teacher";

type Props = {
  next: (group: Group) => void;
};

const GroupSelection = ({ next }: Props) => {
  const classes = useStyles();
  const [selection, setSelection] = React.useState<Group>(null);

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        p={1}
        m={1}
        justifyContent="center"
        textAlign="center"
      >
        <Typography variant="h3" color="textPrimary">
          Select your role
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          Please select your role. A teacher can have access to multiple
          classes, a student can only access one. Teachers also get a special
          tag so that they are recognized as such by students. Teachers have to
          go through a stricter verification process though.
        </Typography>
      </Box>

      <Box
        display="flex"
        flexDirection="row"
        p={1}
        m={1}
        justifyContent="space-around"
      >
        <Card
          elevation={selection === "student" ? 8 : 2}
          className={classes.card}
          onClick={() => setSelection("student")}
        >
          <CardContent>
            <Box display="flex" flexDirection="column" textAlign="center">
              <Students className={classes.svgImage} />
              <Typography variant="caption">Student</Typography>
            </Box>
          </CardContent>
        </Card>
        <Card
          elevation={selection === "teacher" ? 8 : 2}
          className={classes.card}
          onClick={() => setSelection("teacher")}
        >
          <CardContent>
            <Box display="flex" flexDirection="column" textAlign="center">
              <Teacher className={classes.svgImage} />
              <Typography variant="caption">Teacher</Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Box display="flex" justifyContent="space-between" paddingBottom="10px">
        <div />
        <Button
          variant="contained"
          color="primary"
          disabled={selection === null}
          onClick={() => next(selection)}
        >
          Continue
        </Button>
      </Box>
    </>
  );
};

export default GroupSelection;
