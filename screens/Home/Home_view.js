import {
  View,
  Image,
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Button,
} from "react-native";
//import Button from "../../components/Button";
import Backbutton from "../../components/Backbutton";
import { StatusBar } from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { StatusBar as Expostatusbar } from "expo-status-bar";
import { getAuth, signOut } from "firebase/auth";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Chats_view from "../chats/Chats_view";
import Requests_view from "../requests/Requests_view";
import { useFonts } from "expo-font";
import Loading from "../../components/Loading";
import { FontAwesome } from "@expo/vector-icons";
import { useHomefunction } from "./Home_function";

const Home_view = ({ navigation }) => {
  const Tab = createMaterialTopTabNavigator();
  const [data, setdata, FNC_signout] = useHomefunction();
  const [fontsLoaded] = useFonts({
    interbold: require("../../assets/fonts/Inter-Bold.ttf"),
    interregular: require("../../assets/fonts/Inter-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <View style={styles.backcol}>
      <Expostatusbar style="light" />
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.add}
          onPress={() => navigation.navigate("addfriends")}
        >
          <FontAwesome name="plus" size={24} color="white" />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.headtitle}>Chat App</Text>
          <TouchableOpacity
            onPress={() =>
              setdata((prev) => ({
                ...prev,
                showmenu: !data.showmenu,
              }))
            }
          >
            <Entypo name="dots-three-vertical" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: "#61ADFF",
            },
            tabBarLabelStyle: {
              color: "white",
              fontFamily: "interbold",
              fontSize: 12,
            },
          }}
        >
          <Tab.Screen name="chatsroom" component={Chats_view} />
          <Tab.Screen name="requests" component={Requests_view} />
        </Tab.Navigator>

        {data.showmenu === true ? (
          <TouchableOpacity
            style={styles.menuback}
            onPress={() =>
              setdata((prev) => ({
                ...prev,
                showmenu: !data.showmenu,
              }))
            }
          >
            <View style={styles.menuhold}>
              <TouchableOpacity
                style={styles.menuoption}
                onPress={() => FNC_signout()}
              >
                <Entypo name="log-out" size={20} color="black" />
                <Text style={styles.menuholdoptiontxt}> Signout</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuoption}>
                <MaterialIcons name="account-circle" size={20} color="black" />
                <Text style={styles.menuholdoptiontxt}> MyAccount</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ) : null}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  menuback: {
    backgroundColor: "rgba(97, 173, 255, 0)",
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 100,
  },
  menuhold: {
    margin: 10,
    backgroundColor: "white",
    flexDirection: "column",
    position: "absolute",
    right: 10,
    borderRadius: 6,
  },

  menuoption: {
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
  menuholdoptiontxt: {
    fontSize: 14,
    color: "black",
    fontFamily: "interregular",
  },

  //===========================

  backcol: {
    flex: 1,
    backgroundColor: "#61ADFF",
  },
  container: {
    backgroundColor: "white",

    ...Platform.select({
      ios: {},
      android: { marginTop: StatusBar.currentHeight },
    }),

    flex: 1,
  },

  holdall: {
    flex: 1,
    paddingHorizontal: 12,
  },

  header: {
    backgroundColor: "#61ADFF",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 12,
    alignItems: "center",
  },

  headtitle: {
    color: "white",
    fontSize: 22,
    fontFamily: "interbold",
  },

  add: {
    backgroundColor: "#61ADFF",
    position: "absolute",
    bottom: 10,
    right: 10,
    zIndex: 100,
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
});

export default Home_view;
