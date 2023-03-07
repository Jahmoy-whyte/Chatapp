import { useState } from "react";
import { Toast } from "react-native-toast-message/lib/src/Toast";
const DisplayAlert = (msg, type) => {
  Toast.show({
    type: type,
    // text1: ,
    text2: msg,
  });
};

export default DisplayAlert;
