import { StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator } from 'react-native';
 const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={"black"} size = {'large'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Loading