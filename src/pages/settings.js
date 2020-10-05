import React, { useState } from "react";

import firebase from "gatsby-plugin-firebase";
import { useAuthState } from "../utils/firebase-hooks-gatsby";
import { navigate, Link } from "gatsby";

import Layout from "../components/Layout";
import SEO from "../components/SEO";

import LinearProgress from "@material-ui/core/LinearProgress";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import ArrowBackIcon from '@material-ui/icons/ChevronLeft';

const SettingsPage = () => {
  // Check auth status and redirect to login
  const [user, loading] = useAuthState();

  const email = React.useRef();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  React.useEffect(() => {
    if (!loading && user === null) navigate("/");
    if (!loading && user) {
      if (email.current) email.current.value = user.email;
    }
  }, [user, loading, email]);

  return (
    <Layout>
      <SEO title="Boards" />
      {loading ? (
        <LinearProgress />
      ) : (
        <>
          <Accordion>
            <AccordionSummary>Profile Settings</AccordionSummary>
            <AccordionDetails>
              <TextField inputRef={email} label="Email" type="email" />
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  if (newPassword !== newPassword2) return;
                  user.updateEmail(email.current.value);
                }}
              >
                Update Profile
              </Button>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>Password Settings</AccordionSummary>
            <AccordionDetails>
              <TextField
                outlined
                label="Old Password"
                onChange={(e) => setOldPassword(e.target.value)}
                type="password"
                autoComplete="current-password"
              />
              <TextField
                outlined
                label="New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
              />
              <TextField
                outlined
                label="New Password Again"
                onChange={(e) => setNewPassword2(e.target.value)}
                type="password"
                error={newPassword !== newPassword2}
                helperText={
                  newPassword !== newPassword2
                    ? "Password do not match with new password"
                    : null
                }
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  if (newPassword !== newPassword2) return;
                  user
                    .reauthenticateWithCredential(
                      firebase.auth.EmailAuthProvider.credential(
                        user.email,
                        oldPassword
                      )
                    )
                    .then((e) =>
                      e.user
                        .updatePassword(newPassword)
                        .then(() => console.log("success"))
                    );
                }}
              >
                Change Password
              </Button>
            </AccordionDetails>
          </Accordion>
          <Link to="/">
            <Fab
            color="secondary"
            aria-label="return-back"
            style={{
              position: "fixed",
              bottom: "20px",
              left: "20px",
            }}
          >
              <ArrowBackIcon />
            </Fab>
          </Link>
        </>
      )}
    </Layout>
  );
};

export default SettingsPage;
