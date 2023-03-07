import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native";

const Button = ({
  text,
  loading = false,
  Function,
  margintop = 0,
  marginbottom = 10,
  setmarginHorizontal = true,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          marginBottom: marginbottom,
          margintop: margintop,
          marginHorizontal: setmarginHorizontal === true ? 12 : 0,
        },
      ]}
      onPress={() => Function()}
      disabled={loading}
    >
      {loading === false ? (
        <Text style={styles.btntext}>{text}</Text>
      ) : (
        <ActivityIndicator size={"small"} color={"white"} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#61ADFF",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 20,
  },

  btntext: {
    color: "white",
    fontFamily: "interbold",
    fontSize: 14,
  },
});

export default Button;
