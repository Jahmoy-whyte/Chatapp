import { useEffect, useState, useCallback, useContext, useRef } from "react";
import DisplayAlert from "../../helper/DisplayAlert";
import { Userinfo } from "../../context/GbContext";
import { db } from "../../Firebaseconfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDoc,
  setDoc,
  doc,
  addDoc,
  serverTimestamp,
  orderBy,
  limit,
  deleteDoc,
} from "firebase/firestore";
import { auth } from "../../Firebaseconfig";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";

export const useMessagesfunction = (chatdata) => {
  const msgscroll = useRef();
  const nav = useNavigation();
  const [userinfo, setuserinfo] = useContext(Userinfo);
  const [data, setdata] = useState({
    messages: [],
    loading: true,
    text: "",
    showmenu: false,
    loadingsendmsg: true,
  });

  const errorhandle = (error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    DisplayAlert(errorMessage, "error");
    setdata((prev) => ({ ...prev, loading: false, loadingsendmsg: false }));
    // settextboxtext((prev) => ({ ...prev, loading: false }));
  };

  useEffect(() => {
    //  console.log(chatdata.data);
    const q = query(
      collection(db, "Chats", chatdata.data.chatRoomid, "Messages"),
      orderBy("Timestamp", "asc")
    );
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const messagesarr = [];

        if (querySnapshot.size === 0) {
          setdata((prev) => ({ ...prev, loading: false }));
          //  console.log("emptyfwfefwfwfwf");
          return;
        }
        querySnapshot.forEach((doc) => {
          messagesarr.push({ ...doc.data(), messagesid: doc.id });
        });
        //   console.log("found===========================");

        setdata((prev) => ({
          ...prev,
          messages: messagesarr,
          loading: false,
          loadingsendmsg: false,
        }));
        msgscroll.current.scrollToEnd();
      },
      (error) => {
        errorhandle(error);
      }
    );

    return unsubscribe;
  }, []);

  //const FNC_getchats = () => {};

  const FNC_sendmessage = async (sentmessage, servermsg = false) => {
    if (sentmessage === "") return;
    setdata((prev) => ({ ...prev, loadingsendmsg: true }));
    const myid = auth.currentUser.uid;
    const msg = {
      Timestamp: serverTimestamp(),
      Message: sentmessage,
      From: servermsg === false ? myid : "SERVER",
      To: chatdata.data.Userid,
    };
    try {
      const docref = await addDoc(
        collection(db, "Chats", chatdata.data.chatRoomid, "Messages"),
        msg
      );

      msgscroll.current.scrollToEnd();
      setdata((prev) => ({ ...prev, text: "", loadingsendmsg: false }));
    } catch (error) {
      errorhandle(error);
    }
  };

  const FNC_leave = async () => {
    let msg = chatdata.data.Username + " as left the chat";
    await FNC_sendmessage(msg, true);

    try {
      await deleteDoc(doc(db, "Chats", chatdata.data.chatRoomid));
      nav.goBack();
    } catch (error) {
      errorhandle(error);
    }
  };

  return [data, setdata, FNC_sendmessage, msgscroll, FNC_leave];
};
