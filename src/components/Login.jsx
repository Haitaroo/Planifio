import React, { useRef, useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Alert, Box } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch {
      setError('Failed to log in');
    }

    setLoading(false);
  }

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom align="center">
            Log In
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
            <Button
              disabled={loading}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Log In
            </Button>
          </form>
        </CardContent>
      </Card>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        Need an account? <Link to="/signup">Sign Up</Link>
      </Box>
    </Box>
  );
}