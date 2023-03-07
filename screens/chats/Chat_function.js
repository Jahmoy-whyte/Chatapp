import { useEffect, useState, useCallback, useContext } from "react";
import DisplayAlert from "../../helper/DisplayAlert";
import { Userinfo } from "../../context/GbContext";
import { db } from "../../Firebaseconfig";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDoc,
  doc,
} from "firebase/firestore";
import { auth } from "../../Firebaseconfig";
import { useNavigation } from "@react-navigation/native";

export const useChatfunction = () => {
  console.log("Wd=========================");
  const nav = useNavigation();
  const [userinfo, setuserinfo] = useContext(Userinfo);
  const [data, setdata] = useState({
    chats: [],
    loading: true,
    list: [],
  });

  const errorhandle = (error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    DisplayAlert(errorMessage, "error");
    setdata((prev) => ({ ...prev, loading: false }));
    // settextboxtext((prev) => ({ ...prev, loading: false }));
  };

  useEffect(() => {
    const q = query(
      collection(db, "Chats"),
      where("Users", "array-contains", auth.currentUser.uid)
    );
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const chatrooms = [];
        if (querySnapshot.size === 0) {
          setdata((prev) => ({ ...prev, list: [], loading: false }));
          // console.log("emptyfwfefwfwfwf");
          // alert("wdwdwd");
          return;
        }
        querySnapshot.forEach((doc) => {
          chatrooms.push({ ...doc.data(), chatRoomid: doc.id });
        });
        //  setdata((prev) => ({ ...prev, chats: chatrooms, loading: false }));
        FNC_getchats(chatrooms);
        // console.log("Current cities in CA: ", cities.join(", "));
      },
      (error) => {
        errorhandle(error);
      }
    );

    return unsubscribe;
  }, []);

  //const FNC_getchats = () => {};

  const FNC_getchats = async (data) => {
    let chatsdata = [];
    let otheruserid = [];
    let myid = auth.currentUser.uid;
    data.map((d) => {
      otheruserid.push(
        ...d.Users.filter((d1) => {
          return d1 !== myid;
        })
      );
    });
    //console.log(otheruserid);
    //  return;
    try {
      for (let i = 0; i < otheruserid.length; i++) {
        const docRef = doc(db, "Users", otheruserid[i]);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          chatsdata.push({ ...docSnap.data(), chatRoomid: data[i].chatRoomid });
        } else {
          console.log("No such document!");
        }
      }

      setdata((prev) => ({ ...prev, list: chatsdata, loading: false }));
    } catch (error) {
      errorhandle(error);
    }
  };

  const FNC_chatroom = (data) => {
    nav.navigate("messages", {
      data: data,
    });
  };

  return [data, FNC_chatroom];
};
