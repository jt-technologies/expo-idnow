import { StyleSheet, Text, View } from 'react-native'

import * as ExpoIDnow from '@j-tec/expo-idnow'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoIDnow.hello()}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
