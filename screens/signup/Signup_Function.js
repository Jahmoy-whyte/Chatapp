import { useState, useCallback, useEffect } from "react";
import DisplayAlert from "../../helper/DisplayAlert";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebaseconfig";
import { useNavigation } from "@react-navigation/native";
import { db } from "../../Firebaseconfig";
import { doc, setDoc, Timestamp } from "firebase/firestore";

export const useSignupFunction = () => {
  const nav = useNavigation();
  const [textboxtext, settextboxtext] = useState({
    username: "",
    password: "",
    email: "",
    checkbox: false,
    loading: false,
  });

  useEffect(() => {
    nav.addListener("beforeRemove", (e) => {
      if (textboxtext.loading === true) {
        e.preventDefault();
        return;
      }

      // Prevent default behavior of leaving the screen
    });
  }, [textboxtext.loading]);

  const errorhandle = (error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    DisplayAlert(errorMessage, "error");
    settextboxtext((prev) => ({ ...prev, loading: false }));
  };

  const FNC_signup = () => {
    let check = textboxchecker();
    if (check !== true) {
      DisplayAlert(check, "error");
      return;
    }
    settextboxtext((prev) => ({ ...prev, loading: true }));

    createUserWithEmailAndPassword(
      auth,
      textboxtext.email.trim(),
      textboxtext.password.trim()
    )
      .then((userCredential) => {
        const user = userCredential.user;
        FNC_createaccount(auth.currentUser.uid);
      })
      .catch((error) => {
        errorhandle(error);
      });
  };

  const FNC_createaccount = async (userid) => {
    let docData = {
      Username: textboxtext.username,
      Email: textboxtext.email,
      Userid: userid,
      Image: "",
      Description: "",
      Tag: [],
      Bocklist: [],
      Token: "",
      Joinedtime: Timestamp.now(),
    };

    try {
      await setDoc(doc(db, "Users", userid), docData);
      settextboxtext((prev) => ({ ...prev, loading: false }));
      nav.navigate("verify", {
        email: textboxtext.email.trim(),
        password: textboxtext.password.trim(),
        username: textboxtext.username.trim(),
      });
    } catch (error) {
      errorhandle(error);
    }
  };

  const textboxchecker = () => {
    let check = true;
    if (textboxtext.username === "") {
      check = "Please Enter username";
    } else if (textboxtext.email === "") {
      check = "Please Enter Email Address";
    } else if (textboxtext.password === "") {
      check = "Please Enter Email Password";
    } else if (textboxtext.checkbox === false) {
      check = "Please Read our privacy policy";
    }
    return check;
  };

  return [textboxtext, settextboxtext, FNC_signup];
};
