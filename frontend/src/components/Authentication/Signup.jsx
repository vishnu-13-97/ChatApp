import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error,setError]=useState("");

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file)); // Show preview
    setProfilePicture(file); // Store file but don't upload yet
  };

  const handleSignUp = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    let imageUrl = ""; // Store image URL here
  
    if (profilePicture) {
      setUploading(true);
      const imageData = new FormData();
      imageData.append("file", profilePicture);
      imageData.append("upload_preset", "ChatApp");
  
      try {
        const uploadResponse = await fetch(
          `https://api.cloudinary.com/v1_1/dhrus7m9c/image/upload`,
          {
            method: "POST",
            body: imageData,
          }
        );
  
        const data = await uploadResponse.json();
        console.log("Cloudinary Response:", data);
       

        if (data.secure_url) {
          imageUrl = data.secure_url;
        } else {
          alert("Image upload failed!");
          setUploading(false);
          return;
        }
      } catch (error) {
        console.error("Image upload failed:", error);
        alert("Image upload failed!");
        setUploading(false);
        return;
      }
    }
  
    try {
      await axios.post("/api/user/", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        profilePicture: imageUrl,
      });
  
      navigate("/chats");
    } catch (error) {
      if(error.response.status === 400){
        setError("All fields required")
      }

      if(error.response.status === 409){
        setError("User already exists")
      }
      if(error.response.status===500){
        setError("Failed to register")
      }
      console.error("Signup failed:", error.response?.data || error.message);
    
    } finally {
      setUploading(false);
    }
  };
  

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "85vh",
        borderRadius: "25px",
        width: "100%",
        bgcolor: "#f5f5f5",
        padding: 2,
      }}
    >
     {!preview && (
  <Typography variant="h4" sx={{ marginBottom: error ? 1 : 2 }}>
    Sign Up
  </Typography>
)}

       {error && (
              <Alert severity="error" sx={{ marginBottom: 2, maxWidth: "400px", width: "100%" }}>
                {error}
              </Alert>
            )}
      

      <TextField
        label="Full Name"
        name="name"
        variant="outlined"
        required
        fullWidth
        sx={{ marginBottom: 2, maxWidth: "400px" }}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <TextField
        label="Email"
        name="email"
        variant="outlined"
        required
        fullWidth
        sx={{ marginBottom: 2, maxWidth: "400px" }}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <TextField
        label="Password"
        name="password"
        variant="outlined"
        required
        type={showPassword ? "text" : "password"}
        fullWidth
        sx={{ marginBottom: 2, maxWidth: "400px" }}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Confirm Password"
        name="confirmPassword"
        variant="outlined"
        type={showPassword ? "text" : "password"}
        fullWidth
        required
        sx={{ marginBottom: 2, maxWidth: "400px" }}
        onChange={(e) =>
          setFormData({ ...formData, confirmPassword: e.target.value })
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePassword} edge="end">
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
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              overflow: "hidden",
              marginBottom: 2,
              border: "2px solid #ccc",
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
        onClick={handleSignUp}
        disabled={uploading}
      >
        {uploading ? <CircularProgress size={24} /> : "Sign Up"}
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
