import React from "react";

import Layout from "../components/Layout";
import GroupSelection from "../components/Register/GroupSelection";

import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";

const RegisterPage = () => {
  const [step, setStep] = React.useState(0);
  const [group, setGroup] = React.useState(null);

  return (
    <Layout>
      <Container maxWidth="xl">
        <Paper elevation={3}>
          <Stepper activeStep={step} alternativeLabel>
            <Step key="group-selection">
              <StepLabel>Select your role</StepLabel>
            </Step>
            <Step key="enter-details">
              <StepLabel>Fill registration form</StepLabel>
            </Step>
            <Step key="get-verified">
              <StepLabel>Account verification</StepLabel>
            </Step>
          </Stepper>

          <Container maxWidth="md">
            {step === 0 ? (
              <GroupSelection
                next={(newGroup) => {
                  setStep(1);
                  setGroup(newGroup);
                }}
              />
            ) : step === 1 ? (
              <div />
            ) : step === 2 ? (
              group === "student" ? (
                <div />
              ) : group === "teacher" ? (
                <div />
              ) : (
                <Typography color="error">Error</Typography>
              )
            ) : step === 3 ? (
              <div />
            ) : (
              <Typography color="error">Error</Typography>
            )}
          </Container>
        </Paper>
      </Container>
    </Layout>
  );
};

export default RegisterPage;
