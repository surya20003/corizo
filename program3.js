import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

<GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
    <GoogleLogin
        onSuccess={(response) => console.log(response)}
        onError={() => console.log('Login Failed')}
    />
</GoogleOAuthProvider>;