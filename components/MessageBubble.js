import { memo } from "react";
import { StyleSheet, View, Text } from "react-native";

const Messagebubble = ({ msg, data }) => {
  return (
    <View
      style={
        msg.From !== data.Userid && msg.From !== "SERVER"
          ? styles.mytxt
          : msg.From !== "SERVER"
          ? styles.othertxt
          : styles.Servertxt
      }
    >
      <Text style={styles.msgtxt}>{msg.Message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  msgtxt: {
    fontFamily: "interregular",
    paddingHorizontal: 10,
    paddingVertical: 6,
    color: "white",
    fontSize: 12,
  },

  mytxt: {
    alignSelf: "flex-end",
    backgroundColor: "#61ADFF",
    borderRadius: 20,
    marginTop: 10,
  },
  othertxt: {
    alignSelf: "flex-start",
    backgroundColor: "green",
    borderRadius: 20,
    marginTop: 10,
  },

  Servertxt: {
    marginTop: 10,
    backgroundColor: "gray",
    fontFamily: "interregular",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 20,
    color: "white",
    fontSize: 12,
  },
});

export default memo(Messagebubble);
