import { memo } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const Searchcards = ({ data, func }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => func(data)}>
      <View style={styles.contexthold}>
        <View style={styles.profile}>
          <Text style={styles.profiletxt}>{data.Username.substring(0, 1)}</Text>
        </View>

        <View style={styles.discriptionandusername}>
          <Text style={styles.username}>{data.Username}</Text>
          <Text style={styles.discription}>22/45/2001</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: "gray",
    marginVertical: 8,
  },
  contexthold: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },

  profiletxt: {
    fontSize: 14,
    fontFamily: "interbold",
    color: "white",
  },
  discriptionandusername: {
    flexDirection: "column",
    marginLeft: 10,
    flex: 1,
  },
  username: {
    fontSize: 14,
    fontFamily: "interbold",
    color: "black",
  },
  discription: {
    fontSize: 12,
    fontFamily: "interregular",
    color: "#B3B3B3",
  },
  d: {},
  d: {},
  d: {},
});

export default memo(Searchcards);
