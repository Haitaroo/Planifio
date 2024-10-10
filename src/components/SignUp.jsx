import React, { useRef, useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Alert, Box } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      console.log('Attempting to sign up with email:', emailRef.current.value);
      await signup(emailRef.current.value, passwordRef.current.value);
      console.log('Sign up successful');
      navigate('/');
    } catch (error) {
      console.error('Sign up error:', error);
      setError('Failed to create an account: ' + error.message);
    }

    setLoading(false);
  }

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom align="center">
            Sign Up
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              inputRef={emailRef}
              label="Email"
              type="email"
              required
              margin="normal"
            />
            <TextField
              fullWidth
              inputRef={passwordRef}
              label="Password"
              type="password"
              required
              margin="normal"
            />
            <TextField
              fullWidth
              inputRef={passwordConfirmRef}
              label="Password Confirmation"
              type="password"
              required
              margin="normal"
            />
            <Button
              disabled={loading}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        Already have an account? <Link to="/login">Log In</Link>
      </Box>
    </Box>
  );
}