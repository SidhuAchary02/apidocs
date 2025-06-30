import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import api from "../api";

function GoogleAuthButton() {
  const handleSuccess = async (credentialResponse) => {
    try {
      const response = await api.post(
        "/auth/google",
        {
          token: credentialResponse.credential,
        }
      );

      console.log("Logged in!", response.data);

      localStorage.setItem("token", response.data.token);

      localStorage.setItem("user", JSON.stringify(response.data.user));

      window.location.href = "/project-new";
    } catch (err) {
      console.error("Auth failed", err);
    }
  };

  const handleError = () => {
    console.log("Login failed");
  };

  return (
    <div>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
}

export default GoogleAuthButton;
