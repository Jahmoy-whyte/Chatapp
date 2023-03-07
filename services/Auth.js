import { auth } from "../Firebaseconfig";
import { ScreenRoutes } from "../context/GbContext";
import { useContext, useEffect } from "react";

export const useAuthcheck = () => {
  const [screenroute, setscreenroute] = useContext(ScreenRoutes);

  useEffect(() => {
    if (auth) {
      console.log("============================");
      console.log(auth);
    } else {
    }
  }, []);
};
