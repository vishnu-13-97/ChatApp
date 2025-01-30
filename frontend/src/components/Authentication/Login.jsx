import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
        width: "100%",
        borderRadius:"25px",
        bgcolor: "#f5f5f5",
        padding: 2,
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: 1 }}>
        Sign In
      </Typography>

      <TextField
        label="Email"
        variant="outlined"
        required
        fullWidth
        sx={{ marginBottom: 2, maxWidth: "400px" }}
      />

      <TextField
        label="Password"
        variant="outlined"
        sx={{ marginBottom: 0, maxWidth: "400px" }}
        type={showPassword ? "text" : "password"}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleTogglePassword}
                aria-label={showPassword ? "Hide password" : "Show password"}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={rememberMe}
            onChange={handleRememberMeChange}
            color="primary"
          />
        }
        label="Remember Me"
        sx={{ marginBottom: 0, maxWidth: "400px", width: "100%" }}
      />
    <Grid container justifyContent="space-between" sx={{ maxWidth: "400px", width: "100%" ,marginBottom:2}}>
        <Grid item>
          <Typography
            variant="body2"
            color="primary"
            sx={{ cursor: "pointer" }}
            onClick={() => alert("Forgot Password functionality coming soon!")}
          >
            Forgot Password?
          </Typography>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        sx={{ maxWidth: "400px", marginBottom: 2 }}
      >
        Sign In
      </Button>
            <Typography variant="body1" sx={{ marginBottom: 1  }}>
              or
            </Typography>

      <Button
        variant="outlined"
        startIcon={<GoogleIcon />}
        size="large"
        fullWidth
        sx={{ maxWidth: "400px", marginBottom: 2 }}
      >
        Sign In with Google
      </Button>

  
    </Box>
  );
};

export default LogIn;
