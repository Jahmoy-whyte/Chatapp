import {
  View,
  Image,
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Button,
  TextInput,
  Modal,
} from "react-native";
//import Button from "../../components/Button";
import Backbutton from "../../components/Backbutton";
import { StatusBar } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useAddfriend } from "./Addfriends_function";
import Loading from "../../components/Loading";
import Searchcards from "../../components/Searchcards";

const Addfriend_view = ({ navigation }) => {
  const [data, setdata, FNC_findfriends, FNC_showdata, FNC_addfriends] =
    useAddfriend();
  return (
    <>
      <View style={styles.backcol}></View>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View>
            <Backbutton nav={navigation} />
            <Text style={styles.headtitle}>Friends</Text>
          </View>
        </View>

        <View style={styles.holdall}>
          <View style={styles.searchview}>
            <AntDesign
              style={styles.searchicon}
              name="search1"
              size={24}
              color="#B3B3B3"
            />
            <TextInput
              style={styles.searchbox}
              onChangeText={(value) =>
                setdata((prev) => ({ ...prev, text: value }))
              }
              value={data.text}
              onSubmitEditing={() => FNC_findfriends()}
            />
          </View>
          <Text style={styles.smalltxt}>
            You can search for your friend by id or username
          </Text>

          {data.loading === true ? (
            <Loading />
          ) : (
            <ScrollView>
              {data.data.map((data) => {
                return (
                  <>
                    <Searchcards data={data} func={FNC_showdata} />
                  </>
                );
              })}
            </ScrollView>
          )}
        </View>

        <Modal
          visible={data.showmodel}
          onRequestClose={() =>
            setdata((prev) => ({ ...prev, showmodel: false }))
          }
          animationType={"slide"}
        >
          {data.displaydata !== null ? (
            <ScrollView>
              <View style={styles.profilebackdrop}>
                <TouchableOpacity
                  onPress={() =>
                    setdata((prev) => ({ ...prev, showmodel: false }))
                  }
                  style={styles.Backbuttonstyle}
                >
                  <Backbutton nav={navigation} disable={true} />
                </TouchableOpacity>
                <View style={styles.profileimg}>
                  <Text style={styles.profileimgtext}>
                    {data.displaydata.Username.substring(0, 1)}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.addcontainer}
                  onPress={() => FNC_addfriends(data.displaydata.Userid)}
                  disabled={
                    data.addfriendsloading === true
                      ? true
                      : data.addfriendsloading == false
                      ? false
                      : true
                  }
                >
                  <AntDesign name="addusergroup" size={24} color="white" />
                  <Text style={styles.addtxt}>
                    {data.addfriendsloading === true
                      ? "Loading.."
                      : data.addfriendsloading === false
                      ? "Add"
                      : "Sent"}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.infohold}>
                <Text style={styles.infoholdtitle}>Name</Text>
                <Text style={styles.infoholdsubtxt}>
                  {data.displaydata.Username}
                </Text>
              </View>

              <View style={styles.infohold}>
                <Text style={styles.infoholdtitle}>Description</Text>
                <Text style={styles.infoholdsubtxt}>
                  {data.displaydata.Description}
                </Text>
              </View>
            </ScrollView>
          ) : null}
        </Modal>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  backcol: {
    position: "absolute",
    height: "100%",
    top: 0,
    width: "100%",

    backgroundColor: "#61ADFF",
  },

  Backbuttonstyle: {
    position: "absolute",
    zIndex: 100,
    top: 10,
    left: 0,
  },
  profilebackdrop: {
    backgroundColor: "#61ADFF",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },

  profileimg: {
    backgroundColor: "white",
    height: 80,
    width: 80,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  profileimgtext: {
    fontSize: 20,
    fontFamily: "interbold",
    color: "#61ADFF",
  },

  addcontainer: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
  },

  addtxt: {
    fontFamily: "interbold",
    color: "white",
    fontSize: 14,
  },

  infohold: {
    borderWidth: 0.5,
    borderRadius: 6,
    marginHorizontal: 12,
    marginTop: 12,
    padding: 10,
  },

  infoholdtitle: {
    fontFamily: "interbold",
    color: "black",
    fontSize: 14,
  },

  infoholdsubtxt: {
    fontFamily: "interregular",
    color: "#B3B3B3",
    fontSize: 12,
  },

  ///====================================
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
    backgroundColor: "#61ADFF",
    flexDirection: "column",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  headtitle: {
    color: "white",
    fontSize: 22,
    fontFamily: "interbold",
  },

  searchview: {
    marginTop: 10,
    borderRadius: 6,
    borderWidth: 0.5,
    flexDirection: "row",
    alignItems: "center",
  },

  searchbox: {
    paddingVertical: 5,
    // backgroundColor: "red",
    flex: 1,
  },
  searchicon: {
    paddingHorizontal: 5,
  },

  smalltxt: {
    fontFamily: "interregular",
    color: "#B3B3B3",
    fontSize: 12,
  },
});

export default Addfriend_view;
