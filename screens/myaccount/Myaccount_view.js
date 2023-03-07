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
const Myaccount_view = ({ navigation }) => {
  const [data] = useChatfunction();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.holdall}>
        <Tex>Myaccount_view </Tex>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },

  holdall: {
    flex: 1,
    paddingHorizontal: 12,
  },

  imgview: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  img: {
    height: 210,
    width: 210,
  },
  imgtext: {
    fontSize: 12,
    color: "#B3B3B3",
    fontFamily: "interregular",
    textAlign: "center",
  },
});

export default Myaccount_view;
