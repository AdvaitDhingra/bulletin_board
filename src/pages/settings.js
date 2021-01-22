import React, { useState } from "react";
import { Link, Trans, useTranslation } from "gatsby-plugin-react-i18next";
import firebase from "gatsby-plugin-firebase";
import { useAuthState } from "../utils/firebase-hooks-gatsby";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import ToggelableMenu from "../components/ToggelableMenu";

import Container from "@material-ui/core/Container";
import LinearProgress from "@material-ui/core/LinearProgress";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import ArrowBackIcon from "@material-ui/icons/ChevronLeft";

const SettingsPage = () => {
  const { t } = useTranslation();
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
      <SEO
        title={t(`Settings`)}
        description={t(
          "On this setttings page, you can change your password or email, and manage your account generally."
        )}
      />
      {loading ? (
        <LinearProgress />
      ) : (
        <Container maxWidth="md">
          <ToggelableMenu title={<Trans>Profile Settings</Trans>}>
            <TextField inputRef={email} label={t("Email")} type="email" />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                if (newPassword !== newPassword2) return;
                user.updateEmail(email.current.value);
              }}
            >
              <Trans>Update Profile</Trans>
            </Button>
          </ToggelableMenu>
          <ToggelableMenu title={<Trans>Password Settings</Trans>}>
            <TextField
              label={t("Old Password")}
              onChange={(e) => setOldPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
            />
            <TextField
              label={t("New Password")}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
            />
            <TextField
              label={t("New Password Again")}
              onChange={(e) => setNewPassword2(e.target.value)}
              type="password"
              error={newPassword !== newPassword2}
              helperText={
                newPassword !== newPassword2
                  ? t("Password do not match with new password")
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
                  .then((e) => e.user.updatePassword(newPassword));
              }}
            >
              <Trans>Change password</Trans>
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
        </Container>
      )}
    </Layout>
  );
};

export default SettingsPage;
