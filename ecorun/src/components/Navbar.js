import React from "react";
import { useLocation, Link } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Paper from "@mui/material/Paper";

const FixedBottomNavigation = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const getTabIndex = () => {
    if (pathname === "/events") return 0;
    if (pathname === "/amis") return 1;
    if (pathname === "/activite") return 2;
    if (pathname === "/stats") return 3;
    if (pathname === "/profil") return 4;
    return 0; // si pathname existe pas, retour sur /events
  };

  const [value, setValue] = React.useState(getTabIndex());

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="Events"
          icon={<CalendarMonthIcon />}
          component={Link}
          to="/events"
        />
        <BottomNavigationAction
          label="Amis"
          icon={<GroupAddIcon />}
          component={Link}
          to="/amis"
        />
        <BottomNavigationAction
          label="Activité"
          icon={<DirectionsRunIcon />}
          component={Link}
          to="/activite"
        />
        <BottomNavigationAction
          label="Stats"
          icon={<QueryStatsIcon />}
          component={Link}
          to="/stats"
        />
        <BottomNavigationAction
          label="Profil"
          icon={<AccountCircleRoundedIcon />}
          component={Link}
          to="/profil"
        />
      </BottomNavigation>
    </Paper>
  );
};

export default FixedBottomNavigation;
