import { StatusBar as Expostatusbar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "react-native";
import { Platform } from "react-native";
import Loading from "../../components/Loading";
import { useFonts } from "expo-font";
import Backbutton from "../../components/Backbutton";
import Button from "../../components/Button";
import { MotiView } from "moti";
const Ready_view = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    interbold: require("../../assets/fonts/Inter-Bold.ttf"),
    interregular: require("../../assets/fonts/Inter-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.headbar}>
          <Backbutton nav={navigation} />
          <TouchableOpacity>
            <Text
              style={styles.skipbtn}
              onPress={() => navigation.navigate("signup")}
            >
              Skip
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.holdall}>
          <Text style={styles.headtitle}>Chat App</Text>
          <MotiView
            from={{
              transform: [{ scale: 0 }],
              opacity: 0,
            }}
            animate={{
              transform: [{ scale: 1 }],
              opacity: 1,
            }}
          >
            <Image
              style={styles.img}
              source={require("../../assets/ready.png")}
              resizeMode={"contain"}
            />
          </MotiView>
          <MotiView
            from={{
              translateY: 100,
              opacity: 0,
            }}
            animate={{
              translateY: 0,
              opacity: 1,
            }}
            style={styles.txthold}
          >
            <Text style={styles.title}>Ready</Text>

            <Text style={styles.subtxt}>Tap Get started to sign up</Text>
          </MotiView>
        </View>

        <View style={styles.circontainers}>
          <View style={styles.cir}></View>
          <View style={styles.cir}></View>
          <View style={styles.ciractive}></View>
        </View>
        <Button
          text={"Get Started"}
          Function={() => navigation.navigate("signup")}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  txthold: {
    alignItems: "center",
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
    marginHorizontal: 12,
    alignItems: "center",
  },

  headbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    marginHorizontal: 12,
  },

  headtitle: {
    fontFamily: "interbold",
    fontSize: 20,
  },
  skipbtn: {
    fontFamily: "interregular",
    fontSize: 12,
  },

  img: {
    width: 220,
    height: 220,
  },
  title: {
    fontFamily: "interbold",
    fontSize: 14,
  },
  subtxt: {
    fontFamily: "interregular",
    fontSize: 12,
    color: "#B3B3B3",
    textAlign: "center",
  },
  circontainers: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  cir: {
    backgroundColor: "#D9D9D9",
    width: 15,
    height: 15,
    borderRadius: 20,
  },
  ciractive: {
    backgroundColor: "#61ADFF",
    width: 15,
    height: 15,
    borderRadius: 20,
  },
});
export default Ready_view;
