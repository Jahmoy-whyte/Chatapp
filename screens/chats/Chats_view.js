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
import { Entypo } from "@expo/vector-icons";
import Loading from "../../components/Loading";
import Searchcards from "../../components/Searchcards";
import { useChatfunction } from "./Chat_function";

const Chats_view = ({ navigation }) => {
  const [data, FNC_chatroom] = useChatfunction();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.holdall}>
        {data.loading === true ? (
          <Loading />
        ) : data.list < 1 ? (
          <View style={styles.imgview}>
            <Image
              style={styles.img}
              source={require("../../assets/nofriends.png")}
              resizeMode={"contain"}
            />
            <Text style={styles.imgtext}>
              No Friends add a friend to start a chat access. to add someone top
              the plus on the bottom right corner.
            </Text>
          </View>
        ) : (
          data.list.map((data) => {
            return (
              <Searchcards
                data={data}
                key={data.chatRoomid}
                func={FNC_chatroom}
              />
            );
          })
        )}
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

export default Chats_view;
