import { StyleSheet, View, Button, TextInput } from 'react-native'

import {
  ExpoIDnowEnvironment,
  ExpoIDnowEnvironmentConnectionType,
  startIdent,
} from '@j-tec/expo-idnow'
import { useState } from 'react'

export default function App() {
  const [companyId, setCompanyId] = useState<string>()
  const [identToken, setIdentToken] = useState<string>()

  const handlePress = async () => {
    if (!companyId || !identToken) return

    try {
      const response = await startIdent(companyId, identToken, {
        language: 'de',
        connectionType: ExpoIDnowEnvironmentConnectionType.websocket,
        environment: ExpoIDnowEnvironment.test,
      })
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Company ID"
        onChangeText={setCompanyId}
        value={companyId}
      />

      <TextInput
        style={styles.input}
        placeholder="Ident Token"
        onChangeText={setIdentToken}
        value={identToken}
      />

      <Button
        title="Start Ident"
        color="#841584"
        disabled={!companyId || !identToken}
        onPress={handlePress}
      />
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
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
})
