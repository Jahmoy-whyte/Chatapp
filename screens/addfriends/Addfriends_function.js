import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  setDoc,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { db, auth } from "../../Firebaseconfig";
import { useState, useCallback } from "react";
import DisplayAlert from "../../helper/DisplayAlert";

export const useAddfriend = () => {
  const [data, setdata] = useState({
    loading: false,
    text: "",
    data: [],
    showmodel: false,
    displaydata: null,
    addfriendsloading: false,
  });

  const errorhandle = (error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    DisplayAlert(errorMessage, "error");
    setdata((prev) => ({ ...prev, loading: false, addfriendsloading: false }));
    // settextboxtext((prev) => ({ ...prev, loading: false }));
  };

  const FNC_findfriends = async () => {
    setdata((prev) => ({ ...prev, loading: true }));

    try {
      const q = query(
        collection(db, "Users"),
        where("Username", "==", data.text.trim())
      );

      const arr = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        arr.push({ ...doc.data(), Docid: doc.id });
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
      });
      setdata((prev) => ({ ...prev, data: arr, loading: false }));
    } catch (error) {
      errorhandle(error);
    }
  };

  const FNC_showdata = useCallback(
    (data) => {
      setdata((prev) => ({ ...prev, showmodel: true, displaydata: data }));
    },
    [data]
  );

  const FNC_addfriends = async (otherid) => {
    setdata((prev) => ({ ...prev, addfriendsloading: true }));
    try {
      let myid = auth.currentUser.uid;
      let requestdata = {
        To: otherid,
        From: myid,
        Users: [myid, otherid],
        Message: "",
        TimeStamp: Timestamp.now(),
      };
      await addDoc(collection(db, "Requests"), requestdata);
      setdata((prev) => ({
        ...prev,
        addfriendsloading: "Sent",
      }));
      DisplayAlert(" Friend Request Sent ");
    } catch (error) {
      errorhandle(error);
    }
  };

  return [data, setdata, FNC_findfriends, FNC_showdata, FNC_addfriends];
};
