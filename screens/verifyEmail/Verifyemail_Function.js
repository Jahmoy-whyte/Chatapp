import {
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useEffect, useState, useContext } from "react";
import { auth } from "../../Firebaseconfig";
import DisplayAlert from "../../helper/DisplayAlert";
import { ScreenRoutes } from "../../context/GbContext";

const userVerifyemail = ({ email, password, username }) => {
  console.log(email);
  const [screenroute, setscreenroute] = useContext(ScreenRoutes);
  const [data, setdata] = useState({
    loadingbtn: false,
    loadingcode: false,
    email: email,
    password: password,
    username: username,
  });

  useEffect(() => {
    FNC_sendcode(false);
  }, []);

  const errorhandle = (error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    DisplayAlert(errorMessage, "error");
    setdata((prev) => ({ ...prev, loadingcode: false }));
  };

  const FNC_sendcode = (showmsg) => {
    setdata((prev) => ({ ...prev, loadingcode: true }));
    sendEmailVerification(auth.currentUser)
      .then(() => {
        if (showmsg === true) {
          DisplayAlert("Code Sent", "success");
        }
        setdata((prev) => ({ ...prev, loadingcode: false }));
      })
      .catch((error) => {
        errorhandle(error);
      });
  };

  const FNC_Checkverify = async () => {
    setdata((prev) => ({ ...prev, loadingbtn: true }));

    try {
      await auth.currentUser.reload();

      if (auth.currentUser.emailVerified === true) {
        FNC_sign();
        return;
      } else {
        setdata((prev) => ({ ...prev, loadingbtn: false }));
        DisplayAlert("Email not verified", "error");
      }
    } catch (error) {
      errorhandle(error);
    }
  };

  const FNC_sign = () => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        setdata((prev) => ({ ...prev, loadingbtn: false }));
        //  const user = userCredential.user;
        // ...
        setscreenroute("home");
      })
      .catch((error) => {
        console.log(data.email);
        console.log(error);
        errorhandle(error);
      });
  };

  return [data, FNC_sendcode, FNC_Checkverify];
};

export default userVerifyemail;
