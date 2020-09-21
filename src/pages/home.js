import React from "react";

import firebase from "gatsby-plugin-firebase";
import { useAuthState } from "../utils/firebase-hooks-gatsby";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import NewHomeworkDialog from "../components/NewHomeworkDialog";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import LinearProgress from "@material-ui/core/LinearProgress";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

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
  // Check auth status and redirect to login
  const [user, loading] = useAuthState();
  React.useEffect(() => {
    if (!loading && user === null) document.location.href = "/";
  }, [user, loading]);

  const [fach, setFach] = React.useState(0);
  const [kurs, setKurs] = React.useState(0);

  const docSlug = facher[fach] + kurse[facher[fach]][kurs];

  const [anchorElFach, setAnchorElFach] = React.useState(null);
  const [anchorElKurs, setAnchorElKurs] = React.useState(null);
  const [newHomework, setNewHomework] = React.useState(false);

  const [homeworks, setHomeworks] = React.useState(null);

  React.useEffect(() => {
    const unsub = firebase
      .firestore()
      .collection("homework")
      .doc(docSlug)
      .onSnapshot((s) => setHomeworks(s.data()));

    return () => unsub();
  }, [fach, kurs]);

  const getHomeworkAsCopmonents = () => {
    let components = [];
    for (let i in homeworks) {
      let homework = homeworks[i];
      components.push(
        <>
          <h1>{homework.title || "Invalid Title"}</h1>
          <h5>{homework.content || "Invalid Content"}</h5>
        </>
      );
    }
    return components;
  };

  return (
    <Layout>
      <SEO title="Boards" />
      {loading ? (
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
          {getHomeworkAsCopmonents()}
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => setNewHomework(true)}
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
            }}
          >
            <AddIcon />
          </Fab>
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
