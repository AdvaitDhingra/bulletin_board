import React from "react";

//import firebase from "gatsby-plugin-firebase";
import { useAuthState } from "../utils/firebase-hooks-gatsby";

import Layout from "../components/Layout";
import SEO from "../components/SEO";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import LinearProgress from "@material-ui/core/LinearProgress";

const classes = ["Biologie","Chemie", "Deutsch", "English", "Erdkunde", "Erdkunde Fr.", "Französich", "Geschichte", "Geschichte Fr.",  "Kunst", "Latein", "Mathe", "Pädagogik", "Philosophie", "Physik", "SoWi", "Spanisch", "Spanisch-Anfänger"];

const kurse = {
  Biologie: ["G1", "G2", "G3", "G9"],
  Mathe: ["G1", "G2", "V2", "V3", "V4", "V5"],
  Deutsch: ["G1", "G2", "G3", "G4", "G5", "V1"],
  English: ["G1", "G2", "G3", "V2", "V3", "V4"],
  Französich: ["G1", "G2", "G3", "V1", "V2", "V3"],
  Erdkunde: ["G1", "G2"],
  Geschichte: ["G1", "G2", "G3", "G4"],
  ErdkundeFr: ["G1"],
  GeschichteFr: ["G1"],
  Kunst: ["G1", "G2", "G3"],
  Latein: ["G1"],
  Pädagogik: ["G1", "G2"],
  Philosophie: ["G1", "G2", "G3", "G4", "G5", "G9"],
  Physik: ["G1", "G2"],
  SoWi: ["G1"],
  Spanisch: ["G1", "G2"],
  Spanisch_Anfänger: ["G1"],
};

const HomePage = () => {
  // Check auth status and redirect to login
  const [user, loading] = useAuthState();
  React.useEffect(() => {
    if (!loading && user === null) document.location.href = "/";
  }, [user, loading]);

  const [currentClass, setCurrentClass] = React.useState(0);
  const [kurs, setKurs] = React.useState(0);
  const [anchorElFach, setAnchorElFach] = React.useState(null);
  const [anchorElKurs, setAnchorElKurs] = React.useState(null);

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
              <ListItemText primary="Fach:" secondary={classes[currentClass]} />
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
                secondary={kurse[classes[currentClass]][kurs]}
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
            {classes.map((option, index) => (
              <MenuItem
                key={option}
                selected={index === currentClass}
                onClick={() => {
                  setCurrentClass(index);
                  setAnchorElFach(null);
                  if (kurse[classes[index]].length <= kurs) setKurs(0);
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
            {kurse[classes[currentClass]].map((option, index) => (
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
        </>
      )}
    </Layout>
  );
};

export default HomePage;
