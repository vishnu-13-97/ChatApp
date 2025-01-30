import React from "react";
import { Box, CssBaseline, Typography, Tab} from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import LogIn from "../Authentication/Login";
import SignUp from "../Authentication/Signup";



const HomePage = () => {

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#f5f5f5",
          padding: 2,
        }}
      >
        <Box
          sx={{
            border: "2px  #1976d2", // Border color
            borderRadius: "8px",
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            width: "100%",
            maxWidth: 400, // Limit max width for better design
            bgcolor: "#ffffff", // White background inside the border
          }}
        >
          <Typography
            variant="h3"
            sx={{
              marginBottom: 3,
              fontWeight: "bold",
              textAlign: "center",
              color: "#1976d2", // Primary color
            }}
          >
            Chat App
          </Typography>

          

<Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Login" value="1" sx={{width:"50%"}} />
            <Tab label="Sign Up" value="2" sx={{width:"50%"}} />
           
          </TabList>
        </Box>
        <TabPanel value="1"><LogIn/></TabPanel>
        <TabPanel value="2"><SignUp/></TabPanel>
      </TabContext>
    </Box>


          
        </Box>
 </Box>
    </>
  );
};

export default HomePage;
