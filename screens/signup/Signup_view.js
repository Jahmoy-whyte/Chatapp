import { StatusBar as Expostatusbar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { StatusBar } from "react-native";
import { Platform } from "react-native";
import { useFonts } from "expo-font";
import Checkbox from "expo-checkbox";
import { Fontisto } from "@expo/vector-icons";
import Loading from "../../components/Loading";
import Button from "../../components/Button";
import { useSignupFunction } from "./Signup_Function";

const Signup_view = ({ navigation }) => {
  const [textboxtext, settextboxtext, FNC_signup] = useSignupFunction();

  const [fontsLoaded] = useFonts({
    interbold: require("../../assets/fonts/Inter-Bold.ttf"),
    interregular: require("../../assets/fonts/Inter-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <>
      <Expostatusbar style="dark" />
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.holdall}>
          <Text style={styles.headtitle}>Sign Up</Text>
          <Text style={styles.subtext}>Please Sign Up To Continue</Text>
          <View style={styles.alltextboxview}>
            <View style={styles.textboxview}>
              <Text style={styles.textboxlabel}>Username:</Text>
              <TextInput
                style={styles.textbox}
                onChangeText={(value) =>
                  settextboxtext((prev) => ({ ...prev, username: value }))
                }
                value={textboxtext.username}
                editable={textboxtext.loading === false ? true : false}
              />
            </View>

            <View style={styles.textboxview}>
              <Text style={styles.textboxlabel}>Email:</Text>
              <TextInput
                style={styles.textbox}
                onChangeText={(value) =>
                  settextboxtext((prev) => ({ ...prev, email: value }))
                }
                value={textboxtext.email}
                editable={textboxtext.loading === false ? true : false}
              />
            </View>

            <View style={styles.textboxview}>
              <Text style={styles.textboxlabel}>Password:</Text>
              <TextInput
                style={styles.textbox}
                onChangeText={(value) =>
                  settextboxtext((prev) => ({ ...prev, password: value }))
                }
                value={textboxtext.password}
                secureTextEntry={true}
                editable={textboxtext.loading === false ? true : false}
              />
            </View>
          </View>

          <View style={styles.checkboxhold}>
            <Checkbox
              style={styles.checkbox}
              value={textboxtext.checkbox}
              onValueChange={() =>
                settextboxtext((prev) => ({
                  ...prev,
                  checkbox: !textboxtext.checkbox,
                }))
              }
              color={textboxtext.checkbox ? "#61ADFF" : undefined}
              disabled={textboxtext.loading}
            />
            <Text style={styles.smalltext}>
              Please read About our
              <Text
                style={styles.smalltexthighlight}
                disabled={textboxtext.loading}
              >
                {" "}
                Privacy policy{" "}
              </Text>
              before sign up
            </Text>
          </View>

          <Button
            marginbottom={0}
            text={"Signup"}
            loading={textboxtext.loading}
            setmarginHorizontal={false}
            Function={() => FNC_signup()}
          />

          <View style={styles.ortextview}>
            <View style={styles.ortextlines}></View>
            <Text style={styles.ortext}>OR</Text>
            <View style={styles.ortextlines}></View>
          </View>

          <TouchableOpacity style={styles.btn}>
            <Fontisto
              name="google"
              style={styles.btnicon}
              size={20}
              color="white"
            />
            <Text style={styles.btntxt}>Signup With Google </Text>
          </TouchableOpacity>

          <View style={styles.smalltextcontainer}>
            <Text style={styles.smalltext}>
              Have an account?
              <Text
                style={styles.smalltexthighlight}
                disabled={textboxtext.loading}
                onPress={() => navigation.navigate("login")}
              >
                {" "}
                Login
              </Text>
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
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
  headtitle: {
    fontFamily: "interbold",
    fontSize: 22,
    marginTop: 20,
  },
  subtext: {
    fontFamily: "interregular",
    fontSize: 16,
    color: "#B3B3B3",
  },

  alltextboxview: {
    gap: 10,
    marginTop: 25,
    marginBottom: 10,
  },

  textboxview: {
    flex: 1,
    flexDirection: "column",
  },
  textboxlabel: {
    fontFamily: "interregular",
    fontSize: 14,
  },
  textbox: {
    borderRadius: 6,
    borderColor: "#B3B3B3",
    borderWidth: 0.5,
    padding: 5,
  },

  ortextview: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginVertical: 15,
  },
  ortext: {
    fontFamily: "interbold",
    fontSize: 16,
    marginHorizontal: 5,
  },

  ortextlines: {
    backgroundColor: "#B3B3B3",

    flex: 1,
    height: 0.5,
  },
  smalltext: {
    fontFamily: "interregular",
    fontSize: 14,
    color: "#B3B3B3",
    flex: 1,
    flexWrap: "wrap",
  },

  smalltexthighlight: {
    fontFamily: "interbold",
    fontSize: 14,
    color: "#61ADFF",
  },
  btn: {
    backgroundColor: "#61ADFF",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 20,
    flexDirection: "row",
    marginBottom: 10,
  },
  btntxt: {
    fontFamily: "interbold",
    fontSize: 14,
    color: "white",
  },
  btnicon: {
    marginRight: 10,
  },
  checkboxhold: {
    flex: 1,

    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  checkbox: {
    marginRight: 10,
  },
  smalltextcontainer: {
    flex: 1,
    alignItems: "center",
  },
});
export default Signup_view;
