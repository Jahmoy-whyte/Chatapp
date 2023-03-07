import { useEffect, useState, useCallback } from "react";
import DisplayAlert from "../../helper/DisplayAlert";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebaseconfig";
export const useLogingfunction = () => {
  const nav = useNavigation();
  const [textboxtext, settextboxtext] = useState({
    email: "",
    password: "",
    loading: false,
  });

  const errorhandle = (error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    DisplayAlert(errorMessage, "error");
    settextboxtext((prev) => ({ ...prev, loading: false }));
  };

  const FNC_signin = () => {
    let check = FNC_checktextbox();
    if (check !== true) {
      DisplayAlert(check, "error");
      return;
    }

    settextboxtext((prev) => ({ ...prev, loading: true }));
    signInWithEmailAndPassword(
      auth,
      textboxtext.email.trim(),
      textboxtext.password.trim()
    )
      .then((userCredential) => {
        const user = userCredential.user;
        settextboxtext((prev) => ({ ...prev, loading: false }));
        if (user.emailVerified === true) {
          nav.navigate("home");
        } else {
          console.log("her");
          nav.navigate("verify", {
            email: textboxtext.email.trim(),
            password: textboxtext.password.trim(),
            username: "",
          });
        }
      })
      .catch((error) => {
        errorhandle(error);
      });
  };

  const FNC_checktextbox = () => {
    let check = true;
    if (textboxtext.email === "") {
      check = "Enter email";
    } else if (textboxtext.password === "") {
      check = "Enter enter password";
    }

    return check;
  };

  return [textboxtext, settextboxtext, FNC_signin];
};
