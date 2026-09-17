import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';

import { AppProvider } from './src/context/AppContext';
import { ExploreScreen } from './src/screens/ExploreScreen';

export default function App() {
  return (
    <AppProvider>
      <SafeAreaView style={styles.container}>
        <ExploreScreen />
        <StatusBar style="dark" />
      </SafeAreaView>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
});
