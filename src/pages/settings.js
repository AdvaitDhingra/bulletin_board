import React, { useState } from "react";

import firebase from "gatsby-plugin-firebase";
import { useAuthState } from "../utils/firebase-hooks-gatsby";
import { Link } from "gatsby";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import ToggelableMenu from "../components/ToggelableMenu";

import LinearProgress from "@material-ui/core/LinearProgress";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import ArrowBackIcon from "@material-ui/icons/ChevronLeft";

const SettingsPage = () => {
  // Check auth status and redirect to login
  const [user, loading] = useAuthState();

  const email = React.useRef();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  React.useEffect(() => {
    if (!loading && user) {
      if (email.current) email.current.value = user.email;
    }
  }, [user, loading, email]);

  return (
    <Layout authRequired>
      <SEO title="Settings" description="Set you user settings here!" />
      {loading ? (
        <LinearProgress />
      ) : (
        <>
          <ToggelableMenu title="Profile Settings">
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
          </ToggelableMenu>
          <ToggelableMenu title="Password Settings">
            <TextField
              label="Old Password"
              onChange={(e) => setOldPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
            />
            <TextField
              label="New Password"
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
            />
            <TextField
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
          </ToggelableMenu>
          <Link to="/home">
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
