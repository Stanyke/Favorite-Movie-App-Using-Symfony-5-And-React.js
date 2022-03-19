import React, { useEffect } from "react";
import { Box, makeStyles } from "@material-ui/core";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import WaitForPageLoad from "../components/WaitForPageLoad";
import Header from "../components/Header";
import CustomizedTables from "../components/CustomizedTable";

import { DashboardStyle } from "../assets/css/DashboardStyle";
import useApp from "../store/contexts/AppContext";

const useStyles = makeStyles((theme) => DashboardStyle(theme));

export default function Dashboard() {
  const {
    appState: { user, userToken, isLoading, users },
  } = useApp();
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken) {
      return navigate(process.env.REACT_APP_BEFORE_LOGIN_REDIRECT_URL);
    }

  }, [userToken, users, navigate]);

  if (!isLoading) {
    return <WaitForPageLoad />;
  } else {
    return (
      <>
        <Header user={user} />
        <Box className={classes.root}>
          <Box className="container">
            {Object.values(users).length ? (
              <CustomizedTables />
            ) : (
              <Paper>
                <b>No User Available</b>
              </Paper>
            )}
          </Box>
        </Box>
      </>
    );
  }
}
