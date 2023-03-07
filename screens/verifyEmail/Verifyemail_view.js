import {
  View,
  Image,
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Button from "../../components/Button";
import Backbutton from "../../components/Backbutton";
import { StatusBar } from "react-native";
import userVerifyemail from "./Verifyemail_Function";

const Verifyemail_view = ({ navigation, route }) => {
  const { email, password, username } = route.params;
  const [data, FNC_sendcode, FNC_Checkverify] = userVerifyemail({
    ...route.params,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headtopbackbutton}>
        <Backbutton nav={navigation} disable={data.loadingbtn} />
      </View>
      <ScrollView style={styles.holdall}>
        <View style={styles.imageandtext}>
          <Image
            source={require("../../assets/email.png")}
            resizeMode={"contain"}
            style={styles.img}
          />

          <Text style={styles.title}>Verification </Text>

          <Text style={styles.smalltxt}>
            Please check your email and click on the link that was sent to
            <Text style={styles.smalltxthighlight}> {email} </Text>
            to verify
          </Text>
        </View>
      </ScrollView>
      <Text style={styles.smalltxt1}>
        Not See Your Code?
        <Text
          onPress={() => FNC_sendcode(true)}
          style={styles.smalltxthighlight1}
        >
          {data.loadingcode === true ? " Loading" : " Send Again"}
        </Text>
      </Text>
      <Button text={"Verify"} Function={() => FNC_Checkverify()} />
    </SafeAreaView>
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
    marginHorizontal: 12,
  },
  imageandtext: {
    alignItems: "center",
  },
  img: {
    width: 210,
    height: 210,
  },

  title: {
    fontSize: 20,
    fontFamily: "interbold",
  },
  smalltxt: {
    fontSize: 12,
    color: "#B3B3B3",
    fontFamily: "interregular",
    textAlign: "center",
  },
  smalltxthighlight: {
    fontSize: 12,
    color: "black",
    fontFamily: "interbold",
  },
  smalltxt1: {
    fontSize: 12,
    color: "#B3B3B3",
    fontFamily: "interregular",
    textAlign: "center",
    marginBottom: 10,
  },
  smalltxthighlight1: {
    fontSize: 12,
    color: "#61ADFF",
    fontFamily: "interbold",
  },
  headtopbackbutton: {
    marginHorizontal: 12,
    marginTop: 10,
  },
});

export default Verifyemail_view;
