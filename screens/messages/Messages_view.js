import {
  View,
  Image,
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Button,
  Platform,
  StatusBar,
  TextInput,
  FlatList,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useMessagesfunction } from "./Messages_function";
import { useCallback } from "react";
import MessageBubble from "../../components/MessageBubble";

//import Button from "../../components/Button";
const Messages_view = ({ navigation, route, FNC_scolltoend }) => {
  const { data } = route.params;
  const [messagesdata, setmessagesdata, FNC_sendmessage, msgscroll, FNC_leave] =
    useMessagesfunction(route.params);

  return (
    <View style={styles.backcol}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.profile}>
            <View style={styles.profileimg}>
              <Text style={styles.profiletxt}>
                {data.Username.substring(0, 1)}
              </Text>
            </View>
            <Text style={styles.profilename}>{data.Username}</Text>
          </View>

          <TouchableOpacity
            onPress={() =>
              setmessagesdata((prev) => ({
                ...prev,
                showmenu: !messagesdata.showmenu,
              }))
            }
          >
            <Entypo name="dots-three-vertical" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <FlatList
          ref={msgscroll}
          style={styles.holdall}
          data={messagesdata.messages}
          keyExtractor={(item) => item.messagesid}
          //  onLayout={() => msgscroll.current.scrollToEnd()}
          //   onContentSizeChange={() => msgscroll.current.scrollToEnd()}
          renderItem={({ item }) => {
            return <MessageBubble msg={item} data={data} />;
          }}
        />

        <View style={styles.textboxview}>
          <TextInput
            style={styles.textbox}
            onChangeText={(value) =>
              setmessagesdata((prev) => ({ ...prev, text: value }))
            }
            value={messagesdata.text}
            placeholder={" Message"}
          />
          <TouchableOpacity
            disabled={messagesdata.loadingsendmsg}
            style={styles.sendbtn}
            onPress={() => FNC_sendmessage(messagesdata.text)}
          >
            <Text style={styles.sendbtntxt}>Send</Text>
          </TouchableOpacity>
        </View>
        {messagesdata.showmenu === true ? (
          <TouchableOpacity
            style={styles.menuback}
            onPress={() =>
              setmessagesdata((prev) => ({
                ...prev,
                showmenu: !messagesdata.showmenu,
              }))
            }
          >
            <View style={styles.menuhold}>
              <TouchableOpacity
                style={styles.menuoption}
                onPress={() => FNC_leave()}
              >
                <Entypo name="log-out" size={24} color="black" />
                <Text style={styles.menuholdoptiontxt}>Leave</Text>
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
    justifyContent: "space-between",
    backgroundColor: "#61ADFF",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
  },

  profile: {
    backgroundColor: "#61ADFF",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 14,
  },

  profileimg: {
    height: 40,
    width: 40,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },

  profiletxt: {
    fontSize: 12,
    color: "white",
    fontFamily: "interbold",
  },
  profilename: {
    marginLeft: 5,
    fontSize: 14,
    color: "white",
    fontFamily: "interbold",
  },

  textboxview: {
    marginTop: 10,
    justifyContent: "space-between",
    alignItems: "center",

    flexDirection: "row",
    backgroundColor: "#E8E8E8",
  },
  textbox: {
    backgroundColor: "#E8E8E8",
    paddingVertical: 10,
    flex: 1,
    borderRadius: 6,
    //  backgroundColor: "red",
  },
  sendbtn: {
    backgroundColor: "#61ADFF",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 2,
  },

  sendbtntxt: {
    color: "white",
    fontFamily: "interbold",
  },
  scrollbox: {},
});

export default Messages_view;
