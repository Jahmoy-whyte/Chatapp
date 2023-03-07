import { StatusBar as Expostatusbar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Chat_view from "./screens/onboarding/Chats_view";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ready_view from "./screens/onboarding/Ready_view";
import Wellcome_view from "./screens/onboarding/Wellcome_view";
import Signup_view from "./screens/signup/Signup_view";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { ScreenRoutes, Userinfo } from "./context/GbContext";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from "./components/Loading";
import { auth } from "./Firebaseconfig";
import Verifyemail_view from "./screens/verifyEmail/Verifyemail_view";
import Home_view from "./screens/Home/Home_view";
import Login_view from "./screens/login/Login_view";
import Addfriend_view from "./screens/addfriends/Addfriend_view";
import Myaccount_view from "./screens/myaccount/Myaccount_view";
import Messages_view from "./screens/messages/Messages_view";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [screenroute, setscreenroute] = useState("");
  const [userinfo, setuserinfo] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        if (user.emailVerified === true) {
          setscreenroute("home");
        } else {
          setscreenroute("start");
        }

        console.log("data ====================");
      } else {
        // User is signed out
        // ...
        setscreenroute("start");
        console.log("empty =====================");
      }
    });
  }, []);

  return (
    <>
      <Expostatusbar style="dark" />
      <Userinfo.Provider value={[userinfo, setuserinfo]}>
        <ScreenRoutes.Provider value={[screenroute, setscreenroute]}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
                gestureEnabled: false,
                //  contentStyle:{
                // backgroundColor:"#61ADFF",

                //  }
              }}
            >
              {screenroute === "start" ? (
                <Stack.Group>
                  <Stack.Screen
                    name="wellcome"
                    component={Wellcome_view}
                    options={{
                      animation: "none",
                    }}
                  />
                  <Stack.Screen
                    name="chat"
                    component={Chat_view}
                    options={{
                      animation: "none",
                    }}
                  />
                  <Stack.Screen
                    name="ready"
                    component={Ready_view}
                    options={{
                      animation: "none",
                    }}
                  />
                  <Stack.Screen name="signup" component={Signup_view} />
                  <Stack.Screen name="verify" component={Verifyemail_view} />
                  <Stack.Screen name="login" component={Login_view} />
                </Stack.Group>
              ) : screenroute === "home" ? (
                <Stack.Group>
                  <Stack.Screen name="home" component={Home_view} />
                  <Stack.Screen name="addfriends" component={Addfriend_view} />
                  <Stack.Screen name="messages" component={Messages_view} />
                </Stack.Group>
              ) : (
                <Stack.Group>
                  <Stack.Screen name="Loading" component={Loading} />
                </Stack.Group>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </ScreenRoutes.Provider>
      </Userinfo.Provider>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
