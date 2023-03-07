import {
  View,
  Image,
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Button,
  Modal,
} from "react-native";
//import Button from "../../components/Button";
import Backbutton from "../../components/Backbutton";
import { StatusBar } from "react-native";
import { Entypo, Ionicons, AntDesign } from "@expo/vector-icons";
import { useRequestsfunction } from "./Requests_function";
import Loading from "../../components/Loading";
import Searchcards from "../../components/Searchcards";

const Chats_view = ({ navigation }) => {
  const [data, setdata, FNC_showdata, Acceptrequest, Rejectrequest] =
    useRequestsfunction();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.holdall}>
        {data.loading === true ? (
          <Loading />
        ) : data.requestsID.length === 0 ? (
          <View style={styles.imgview}>
            <Image
              style={styles.img}
              source={require("../../assets/norequests.png")}
              resizeMode={"contain"}
            />
            <Text style={styles.imgtext}>No Incomming Requests</Text>
          </View>
        ) : (
          data.list.map((data) => {
            return (
              <Searchcards data={data} func={FNC_showdata} key={data.Roomid} />
            );
          })
        )}
      </View>

      <Modal
        visible={data.showmodel}
        onRequestClose={() =>
          setdata((prev) => ({ ...prev, showmodel: false }))
        }
      >
        {data.modeldata !== null ? (
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

              {data.modeldata.Image !== "" ? (
                <Image
                  source={{ uri: data.modeldata.Image }}
                  style={{ width: 50, height: 50 }}
                />
              ) : (
                <View style={styles.profileimg}>
                  <Text style={styles.profileimgtext}>
                    {data.modeldata.Username.substring(0, 1)}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.infohold}>
              <Text style={styles.infoholdtitle}>Name</Text>
              <Text style={styles.infoholdsubtxt}>
                {data.modeldata.Username}
              </Text>
            </View>

            <View style={styles.infohold}>
              <Text style={styles.infoholdtitle}>Description</Text>
              <Text style={styles.infoholdsubtxt}>
                {data.modeldata.Description}
              </Text>
            </View>

            <View style={styles.accpetanddeclinecontainer}>
              <TouchableOpacity
                disabled={
                  data.loadingaccept === true
                    ? true
                    : data.loadingreject === true
                    ? true
                    : false
                }
                onPress={() => Rejectrequest(data.modeldata.Roomid, true)}
                style={[styles.actionbtn, { backgroundColor: "#FF3737" }]}
              >
                <Ionicons name="close" size={24} color="white" />
                <Text style={styles.btntxt}>
                  {data.loadingaccept === true ? "Loading.." : "Decline"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={
                  data.loadingaccept === true
                    ? true
                    : data.loadingreject === true
                    ? true
                    : false
                }
                Rejectrequest
                onPress={() =>
                  Acceptrequest(data.modeldata.Userid, data.modeldata.Roomid)
                }
                style={[styles.actionbtn, { backgroundColor: "#61ADFF" }]}
              >
                <AntDesign name="check" size={24} color="white" />
                <Text style={styles.btntxt}>
                  {data.loadingaccept === true ? "Loading.." : "Accept"}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : null}
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

  accpetanddeclinecontainer: {
    // backgroundColor: "red",
    justifyContent: "center",
    gap: 10,
    flexDirection: "row",
    marginTop: 12,
    alignItems: "center",
    marginHorizontal: 10,
  },

  actionbtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    flex: 1,
    borderRadius: 6,
  },

  btntxt: {
    fontFamily: "interbold",
    color: "white",
    fontSize: 12,
  },

  ///====================================

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
