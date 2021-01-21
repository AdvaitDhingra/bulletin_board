import React from "react";

import { useAuthState } from "../utils/firebase-hooks-gatsby";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import NewHomeworkDialog from "../components/NewHomeworkDialog";
import MenuFab from "../components/MenuFab";
import HomeworksLister from "../components/HomeworksLister";

import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import LinearProgress from "@material-ui/core/LinearProgress";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const facher = [
  "Biologie",
  "Chemie",
  "Deutsch",
  "English",
  "Erdkunde",
  "Erdkunde Fr.",
  "Französich",
  "Geschichte",
  "Geschichte Fr.",
  "Kunst",
  "Latein",
  "Mathe",
  "Pädagogik",
  "Philosophie",
  "Physik",
  "SoWi",
  "Spanisch",
  "Spanisch-Anfänger",
];

const kurse = {
  Biologie: ["G1", "G2", "G3", "G9"],
  Chemie: ["G1", "G2"],
  Mathe: ["G1", "G2", "V2", "V3", "V4", "V5"],
  Deutsch: ["G1", "G2", "G3", "G4", "G5", "V1"],
  English: ["G1", "G2", "G3", "V2", "V3", "V4"],
  Französich: ["G1", "G2", "G3", "V1", "V2", "V3"],
  Erdkunde: ["G1", "G2"],
  Geschichte: ["G1", "G2", "G3", "G4"],
  "Erdkunde Fr.": ["G1"],
  "Geschichte Fr.": ["G1"],
  Kunst: ["G1", "G2", "G3"],
  Latein: ["G1"],
  Pädagogik: ["G1", "G2"],
  Philosophie: ["G1", "G2", "G3", "G4", "G5", "G9"],
  Physik: ["G1", "G2"],
  SoWi: ["G1"],
  Spanisch: ["G1", "G2"],
  "Spanisch-Anfänger": ["G1"],
};

const HomePage = () => {
  const [user, loading] = useAuthState();

  const [fach, setFach] = React.useState(0);
  const [kurs, setKurs] = React.useState(0);

  const [anchorElFach, setAnchorElFach] = React.useState(null);
  const [anchorElKurs, setAnchorElKurs] = React.useState(null);
  const [newHomework, setNewHomework] = React.useState(false);

  return (
    <Layout authRequired>
      <SEO
        title="Homework"
        description="You need to be logged in to see this. All your homework is listed here."
      />
      {loading || user === null ? (
        <LinearProgress />
      ) : (
        <>
          <List component="nav">
            <ListItem
              button
              aria-haspopup="true"
              aria-controls="fach-menu"
              aria-label="Fach"
              onClick={(e) => setAnchorElFach(e.currentTarget)}
            >
              <ListItemText
                primary={<Typography color="primary">Fach:</Typography>}
                secondary={facher[fach]}
              />
              <ExpandMoreIcon />
            </ListItem>
            <ListItem
              button
              aria-haspopup="true"
              aria-controls="kurs-menu"
              aria-label="Kurs"
              onClick={(e) => setAnchorElKurs(e.currentTarget)}
            >
              <ListItemText
                primary={<Typography color="primary">Kurs:</Typography>}
                secondary={kurse[facher[fach]][kurs]}
              />
              <ExpandMoreIcon />
            </ListItem>
          </List>
          <Menu
            id="fach-menu"
            keepMounted
            open={Boolean(anchorElFach)}
            anchorEl={anchorElFach}
            onClose={() => setAnchorElFach(null)}
          >
            {facher.map((option, index) => (
              <MenuItem
                key={option}
                selected={index === fach}
                onClick={() => {
                  setFach(index);
                  setAnchorElFach(null);
                  if (kurse[facher[index]].length <= kurs) setKurs(0);
                }}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
          <Menu
            id="kurs-menu"
            keepMounted
            open={Boolean(anchorElKurs)}
            anchorEl={anchorElKurs}
            onClose={() => setAnchorElKurs(null)}
          >
            {kurse[facher[fach]].map((option, index) => (
              <MenuItem
                key={option}
                selected={index === kurs}
                onClick={() => {
                  setKurs(index);
                  setAnchorElKurs(null);
                }}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
          {!loading && user ? (
            <HomeworksLister
              courseName={facher[fach]}
              subCourseName={kurse[facher[fach]][kurs]}
            />
          ) : (
            <></>
          )}
          <MenuFab onNewHomework={() => setNewHomework(true)} />
          {newHomework && (
            <NewHomeworkDialog
              onClose={() => setNewHomework(false)}
              courseName={facher[fach]}
              subCourseName={kurse[facher[fach]][kurs]}
            />
          )}
        </>
      )}
    </Layout>
  );
};

export default HomePage;
