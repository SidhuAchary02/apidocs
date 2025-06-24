import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function GoogleAuthButton() {
  const handleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/google', {
        token: credentialResponse.credential
      });

      console.log('Logged in!', response.data);
      // Save token, redirect, etc.
    } catch (err) {
      console.error('Auth failed', err);
    }
  };

  const handleError = () => {
    console.log('Login failed');
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </div>
  );
}

export default GoogleAuthButton;
