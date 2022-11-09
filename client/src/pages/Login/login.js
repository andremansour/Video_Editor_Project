
import styled from 'styled-components';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getOptionGroupUnstyledUtilityClass } from '@mui/base';
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import './login.css'
import {component} from 'react';
import {Link} from "react-router-dom"



const theme = createTheme();
const google = window.google;


const Login = () => {
/*
  function handleCallbackResponse(response){
    console.log("Encode JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
  }

  useEffect(() => {
    /*callback calls function that we want to call after someone signs in
    google.accounts.id.initialize({
      client_id: "869796219501-qth6qv43cct45e9ccvaernkavoiap0ab.apps.googleusercontent.com", 
      callback: handleCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"), 
      { theme:"outline", size: "large"}
      );
    
  }, []);
  */
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <section className="login-page">
      <Container component="main" maxWidth="xs" className='login-form'>
      
        
        <div className='login-formm'>
        
        
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="C:\Users\khanm\Documents\GitHub\Video_Editor_Project\client\src\pages\Register\Register.js" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          <div id='signInDiv'> 
            <Box>
              
            </Box>
          </div>
        </Box>
        </div>
        
      </Container>
  
    </section>
  );


}

export default Login

