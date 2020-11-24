import React from "react";

import firebase from "gatsby-plugin-firebase";
import { useAuthState } from "../utils/firebase-hooks-gatsby";
import { Link } from "gatsby";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import NewHomeworkDialog from "../components/NewHomeworkDialog";
import LoadingHomework from "../components/LoadingHomework";
import Homework from "../components/Homework";

import Empty from "../images/empty.svg";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import LinearProgress from "@material-ui/core/LinearProgress";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import SettingsIcon from "@material-ui/icons/Settings";
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

  const docSlug = facher[fach] + kurse[facher[fach]][kurs];

  const [anchorElFach, setAnchorElFach] = React.useState(null);
  const [anchorElKurs, setAnchorElKurs] = React.useState(null);
  const [newHomework, setNewHomework] = React.useState(false);

  const [homeworks, setHomeworks] = React.useState(null);
  const [homeworksExist, setHomeworksExist] = React.useState(false);
  const [homeworksLoading, setHomeworksLoading] = React.useState(true);

  React.useEffect(() => {
    // Don't set up listeners if it isn't yet possible
    if (loading || user === null) return;

    const unsub = firebase
      .firestore()
      .collection("homework")
      .doc(docSlug)
      .onSnapshot((s) => {
        const data = s.data();
        setHomeworks(data);
        setHomeworksExist(s.exists && Object.keys(data).length !== 0);
        setHomeworksLoading(false);
      });

    return () => unsub();
  }, [docSlug, user, loading]);

  let homeworkDisplayList;

  if (homeworksLoading) {
    homeworkDisplayList = (
      <>
        <LoadingHomework />
        <LoadingHomework />
        <LoadingHomework />
      </>
    );
  } else if (homeworksExist) {
    homeworkDisplayList = [];
    let timeout = 0;
    for (let i in homeworks) {
      let homework = homeworks[i];
      homeworkDisplayList.push(
        <Homework
          id={i}
          key={i} // This has to be duplicated due to the way react works
          timeout={++timeout}
          title={homework.title || "Invalid Title"}
          content={homework.content || "Invalid Content"}
          startDate={homework.startDate}
          dueDate={homework.returnDate}
          docSlug={docSlug}
        />
      );
    }
  } else
    homeworkDisplayList = (
      <div style={{ margin: "0 35% 0 35%", textAlign: "center" }}>
        <Empty />
        <p>This is empty...</p>
      </div>
    );

  return (
    <Layout authRequired>
      <SEO title="FEG Board" />
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
              <ListItemText primary="Fach:" secondary={facher[fach]} />
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
                primary="Kurs:"
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
          {homeworkDisplayList}
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => setNewHomework(true)}
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
            }}
          >
            <AddIcon />
          </Fab>
          <Link to="/settings">
            <Fab
              size="small"
              aria-label="settings"
              style={{
                position: "fixed",
                bottom: "25px",
                right: "90px",
              }}
            >
              <SettingsIcon />
            </Fab>
          </Link>
          {newHomework && (
            <NewHomeworkDialog
              onClose={() => setNewHomework(false)}
              doc={docSlug}
            />
          )}
        </>
      )}
    </Layout>
  );
};

export default HomePage;
