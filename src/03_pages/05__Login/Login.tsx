import {} from "react";
import "./Login.scss";
import { Button } from "@export";
import { FaGoogle } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { GoogleProvider, auth } from "../../10_firebase/firebase.config";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const handleLoginGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, GoogleProvider);
      const { uid } = result.user;
      localStorage.setItem("uid", uid);
      return navigate("/watchlist");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="login__container">
        <div className="login__card">
          <div className="btn__container__login">
            <Button className="login__btn" onClick={handleLoginGoogle}>
              <FaGoogle size={40} className="icon" />
              Login with Google
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
