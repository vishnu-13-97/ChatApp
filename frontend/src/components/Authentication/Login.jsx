import React, { useState } from "react";
import axios from "axios";
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
  Alert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // Now a single string for simplicity

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
  
    });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
     const response =  await axios.post("/api/user/login", formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    if (response.data.token) {
      localStorage.setItem("token", response.data.token); 
      navigate("/chats"); 
    }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 400) setError("All fields are required.");
        else if (status === 401) setError("Invalid username or password.");
        else setError("Something went wrong. Please try again.");
      } else {
        setError("Server is unreachable. Check your internet connection.");
      }
      console.error("Login Error:", error);
    }
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
        borderRadius: "25px",
        bgcolor: "#f5f5f5",
        padding: 2,
      }}
    >
      {!error && (
       <Typography variant="h4" sx={{ marginBottom: 1 }}>
        Sign In
      </Typography>
        )}

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2, maxWidth: "400px", width: "100%" }}>
          {error}
        </Alert>
      )}

      <TextField
        label="Email"
        variant="outlined"
        required
        fullWidth
        name="email"
        value={formData.email}
        onChange={handleChange}
        sx={{ marginBottom: 2, maxWidth: "400px" }}
      />

      <TextField
        label="Password"
        variant="outlined"
        type={showPassword ? "text" : "password"}
        fullWidth
        name="password"
        value={formData.password}
        onChange={handleChange}
        sx={{ marginBottom: 2, maxWidth: "400px" }}
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
            onChange={() => setRememberMe(!rememberMe)}
            color="primary"
          />
        }
        label="Remember Me"
        sx={{ marginBottom: 2, maxWidth: "400px", width: "100%" }}
      />

      <Grid container justifyContent="space-between" sx={{ maxWidth: "400px", width: "100%", marginBottom: 2 }}>
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
        onClick={handleSubmit}
      >
        Sign In
      </Button>

      <Typography variant="body1" sx={{ marginBottom: 1 }}>
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
