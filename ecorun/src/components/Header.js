import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function DenseAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        {" "}
        {/* Fixer la barre en haut */}
        <Toolbar variant="dense">
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ width: "100%", textAlign: "center" }} // Centrer le texte
          >
            EcoRun
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
