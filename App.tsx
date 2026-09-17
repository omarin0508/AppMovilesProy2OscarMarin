import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';

import { AppProvider } from './src/context/AppContext';
import { StarterScreen } from './src/screens/StarterScreen';

export default function App() {
  return (
    <AppProvider>
      <SafeAreaView style={styles.container}>
        <StarterScreen />
        <StatusBar style="dark" />
      </SafeAreaView>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },
});
