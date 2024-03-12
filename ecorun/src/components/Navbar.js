import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Paper from "@mui/material/Paper";

export default function FixedBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Events" icon={<CalendarMonthIcon />} />
          <BottomNavigationAction label="Amis" icon={<GroupAddIcon />} />
          <BottomNavigationAction
            label="Activité"
            icon={<DirectionsRunIcon />}
          />
          <BottomNavigationAction label="Stats" icon={<QueryStatsIcon />} />
          <BottomNavigationAction
            label="Profil"
            icon={<AccountCircleRoundedIcon />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
