import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "85vh",
        borderRadius:"25px",
        width: "100%",
        bgcolor: "#f5f5f5",
        padding: 2,
      }}
    >
      {!preview && 
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Sign Up
      </Typography>
      }
      <TextField
        label="Full Name"
        variant="outlined"
        required
        fullWidth
        sx={{ marginBottom: 2, maxWidth: "400px" }}
      />
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
        type={showPassword ? "text" : "password"}
        fullWidth
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
      <TextField
        label="Confirm Password"
        variant="outlined"
        sx={{ marginBottom: 2, maxWidth: "400px" }}
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 2,
          maxWidth: "400px",
          width: "100%",
        }}
      >
        {preview && (
          <Box
            sx={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              overflow: "hidden",
              marginBottom: 2,
            }}
          >
            <img
              src={preview}
              alt="Profile Preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        )}
        <Button
          variant="outlined"
          component="label"
          fullWidth
          sx={{ marginBottom: 1 }}
        >
          Upload Profile Picture

          
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleProfilePictureChange}
          />
        </Button>
        
      </Box>
      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        sx={{ maxWidth: "400px", marginBottom: 1 }}
      >
        Sign Up
      </Button>
      <Typography variant="body1" sx={{ marginBottom: 1 }}>
        or
      </Typography>
      <Button
        variant="outlined"
        startIcon={<GoogleIcon />}
        size="large"
        fullWidth
        sx={{ maxWidth: "400px" }}
      >
        Sign Up with Google
      </Button>
    </Box>
  );
};

export default SignUp;
