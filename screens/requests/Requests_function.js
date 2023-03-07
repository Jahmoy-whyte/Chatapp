import { useEffect, useState, useCallback, useContext } from "react";
import DisplayAlert from "../../helper/DisplayAlert";
import { Userinfo } from "../../context/GbContext";
import { db } from "../../Firebaseconfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth } from "../../Firebaseconfig";
import { async } from "@firebase/util";

export const useRequestsfunction = () => {
  const [userinfo, setuserinfo] = useContext(Userinfo);
  const [data, setdata] = useState({
    requestsID: [],
    loading: true,
    list: [],
    showmodel: false,
    modeldata: null,
    loadingaccept: false,
    loadingreject: false,
  });

  const errorhandle = (error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    DisplayAlert(errorMessage, "error");
    setdata((prev) => ({
      ...prev,
      loading: false,
      loadingaccept: false,
      loadingreject: false,
    }));
    // settextboxtext((prev) => ({ ...prev, loading: false }));
  };

  useEffect(() => {
    const q = query(
      collection(db, "Requests"),
      where("To", "==", auth.currentUser.uid)
    );
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const requests = [];
        if (querySnapshot.size === 0) {
          setdata((prev) => ({ ...prev, loading: false }));
          // console.log("request ==========");
          setdata((prev) => ({ ...prev, requestsID: [], loading: false }));
          return;
        }
        querySnapshot.forEach((doc) => {
          requests.push({ ...doc.data(), Roomid: doc.id });
        });
        setdata((prev) => ({ ...prev, requestsID: requests }));
        FNC_idtodata(requests);
        //   console.log(requests);
      },
      (error) => {
        errorhandle(error);
      }
    );

    return unsubscribe;
  }, []);

  //const FNC_getchats = () => {};

  const FNC_idtodata = async (requestsid) => {
    let requestdata = [];
    console.log(requestsid);
    try {
      for (let i = 0; i < requestsid.length; i++) {
        const docRef = doc(db, "Users", requestsid[i].From);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          //console.log("Document data:", docSnap.data());
          requestdata.push({ ...docSnap.data(), Roomid: requestsid[i].Roomid });
        } else {
          console.log("No such document!");
        }
      }

      setdata((prev) => ({ ...prev, list: requestdata, loading: false }));
    } catch (error) {
      errorhandle(error);
    }
  };

  const FNC_showdata = useCallback(
    (data) => {
      console.log(data.Image);
      setdata((prev) => ({ ...prev, showmodel: true, modeldata: data }));
    },
    [data]
  );

  const Acceptrequest = async (otheruser, requestdoc) => {
    // console.log("error");
    setdata((prev) => ({ ...prev, loadingaccept: true }));
    try {
      const myid = auth.currentUser.uid;
      const createroom = {
        Users: [myid, otheruser],
        Lastmessage: "",
      };

      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "Chats"), createroom);

      Rejectrequest(requestdoc, false);
    } catch (error) {
      console.log(error);
      errorhandle(error);
    }
  };

  const Rejectrequest = async (requestdoc, isreject) => {
    try {
      console.log(requestdoc);
      if (isreject === true) {
        setdata((prev) => ({ ...prev, loadingreject: true }));
      }
      await deleteDoc(doc(db, "Requests", requestdoc));
      setdata((prev) => ({
        ...prev,
        loadingaccept: false,
        loadingreject: false,
        showmodel: false,
      }));
    } catch (error) {
      errorhandle(error);
    }
  };

  return [data, setdata, FNC_showdata, Acceptrequest, Rejectrequest];
};
