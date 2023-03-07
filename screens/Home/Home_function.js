import { useState } from "react";
import { auth } from "../../Firebaseconfig";
import DisplayAlert from "../../helper/DisplayAlert";
import { signOut } from "firebase/auth";

export const useHomefunction = () => {
  const [data, setdata] = useState({
    showmenu: false,
  });
  const FNC_signout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        DisplayAlert(error.code, "error");
      });
  };
  return [data, setdata, FNC_signout];
};
