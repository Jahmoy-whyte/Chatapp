import {
  View,
  Image,
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from "react-native";
import Button from "../../components/Button";
import Backbutton from "../../components/Backbutton";
import { StatusBar } from "react-native";
import { useLogingfunction } from "./Login_Function";

const Login_view = ({ navigation }) => {
  const [textboxtext, settextboxtext, FNC_signin] = useLogingfunction();
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.holdall}>
          <Text style={styles.headtitle}>Login</Text>
          <Text style={styles.subtext}>Please Login To Continue</Text>
          <View style={styles.alltextboxview}>
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

          <Button
            marginbottom={10}
            text={"Login"}
            loading={textboxtext.loading}
            setmarginHorizontal={false}
            Function={() => FNC_signin()}
          />

          <View style={styles.smalltextcontainer}>
            <Text style={styles.smalltext}>
              Dont Have an account?
              <Text
                style={styles.smalltexthighlight}
                disabled={textboxtext.loading}
                onPress={() => navigation.navigate("signup")}
              >
                {" "}
                SignUp
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

export default Login_view;
