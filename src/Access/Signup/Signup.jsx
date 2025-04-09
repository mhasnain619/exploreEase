import React, { useState } from "react";
import { Grid, TextField, Button, Typography, Box, InputAdornment, IconButton, Snackbar, Alert } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import "./Signup.css";
import loginImage from '../../assets/signup.png';
// import waveImg from '../../assets/wave.png';
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "../../FireBaseConfig";

const SignupPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState({});
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const validateInputs = () => {
        let errors = {};
        if (!credentials.name) errors.name = "Full name is required";
        if (!credentials.email.includes("@")) errors.email = "Enter a valid email";
        if (credentials.password.length < 6) errors.password = "Password should be at least 6 characters";
        if (credentials.password !== credentials.confirmPassword) errors.confirmPassword = "Passwords do not match";
        return errors;
    };

    const getCredentials = () => {
        const validationErrors = validateInputs();
        if (Object.keys(validationErrors).length > 0) {
            setError(validationErrors);
            return;
        }

        createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
            .then((userCredential) => {
                const user = userCredential.user;
                localStorage.setItem('uid', user.uid);

                updateProfile(user, { displayName: credentials.name }).catch((err) => setError({ general: err.message }));

                const userObj = {
                    name: credentials.name,
                    email: credentials.email,
                    uid: user.uid,
                };

                setDoc(doc(db, 'users', user.uid), userObj)
                    .then(() => console.log("User data saved to Firestore"))
                    .catch((err) => setError({ general: err.message }));

                setOpen(true);
                setTimeout(() => navigate('/'), 2000);
            })
            .catch((err) => setError({ general: err.message }));
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
        setError({});
    };

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    return (
        <Grid container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid item xs={12} md={6}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    // backgroundImage: `url(${waveImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: '100vh',
                    width: '100%',
                }} className="leftPanel">
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                        Account Created Successfully!
                    </Alert>
                </Snackbar>
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={!!error.general} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" variant="filled">
                        {error.general}
                    </Alert>
                </Snackbar>
                <Box className='welComeTo'>
                    <Typography textAlign='start' variant="h4" fontWeight='600' sx={{ color: 'black' }} gutterBottom>
                        Wellcome to <span style={{ color: "#5379F6", fontWeight: '600' }}>ExploreEase</span>
                    </Typography>
                    <Typography textAlign='start' variant="h6" fontWeight='400' sx={{ color: 'black' }} gutterBottom>
                        Join ExploreEase and unlock powerful tools for user management, product discovery, and developer networking.
                        Create your account in seconds to gain access to real-time analytics, intuitive controls,
                        and responsive design—crafted with React and Material-UI for optimal performance.
                    </Typography>
                </Box>
                <Box sx={{ height: '320px', width: '400px' }}>
                    <img height='100%' width='100%' src={loginImage} alt="Learning System" className="image" />
                </Box>
            </Grid>
            <Grid item xs={12} md={6} className="rightPanel">
                <Box>
                    <Typography variant="h5" align="start" gutterBottom>
                        Create Your Account
                    </Typography>
                    <TextField
                        type="text"
                        fullWidth
                        onChange={(e) => setCredentials({ ...credentials, name: e.target.value })}
                        label="Full Name"
                        variant="outlined"
                        margin="normal"
                        error={!!error.name}
                        helperText={error.name}
                    />
                    <TextField
                        fullWidth
                        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        type="email"
                        error={!!error.email}
                        helperText={error.email}
                    />
                    <TextField
                        fullWidth
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        error={!!error.password}
                        helperText={error.password}
                    />
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        onChange={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })}
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        margin="normal"
                        error={!!error.confirmPassword}
                        helperText={error.confirmPassword}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button onClick={getCredentials} fullWidth className="loginButton" size="large" variant="contained">
                        Signup
                    </Button>
                </Box>
                <Typography variant="body2" align="center" className="orText">
                    Or
                </Typography>
                <Typography variant="body2" align="center" color="primary" className="clickable" onClick={() => navigate('/login')}>
                    Login
                </Typography>
            </Grid>
        </Grid>
    );
};

export default SignupPage;
