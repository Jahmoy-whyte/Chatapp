import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text,TouchableOpacity,View } from 'react-native';

const Backbutton = ({nav, disable =false})=> {
  return (
    <TouchableOpacity style={styles.container} 
    onPress={()=> nav.goBack()}
    disabled = {disable}
    >
        
        <View style = {styles.textandicon}>
        <MaterialIcons name="keyboard-arrow-left" size={24} color="white" />
      <Text style = {styles.bactxt}>Back</Text>
     </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection:"row",
  },

  textandicon:{

    borderRadius:20,
    backgroundColor: '#61ADFF',
    flexDirection:"row",
    padding:3,
    alignItems: 'center',
    paddingRight:8,
  },

  bactxt:{
    fontFamily: "interbold",
    fontSize:12,
    color :"white",
  }
});

export default Backbutton;