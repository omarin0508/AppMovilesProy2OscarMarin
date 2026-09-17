import { StyleSheet, Text, View } from 'react-native';

import { InfoItem } from '../components/InfoItem';
import { useAppContext } from '../context/AppContext';

export function StarterScreen() {
  const { appInfo } = useAppContext();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Proyecto 2</Text>
        <Text style={styles.title}>{appInfo.projectName}</Text>
        <Text style={styles.description}>
          Base Expo + React Native + TypeScript lista para definir API y persistencia en la siguiente fase.
        </Text>
      </View>

      <View style={styles.panel}>
        <InfoItem label="Curso" value={appInfo.course} />
        <InfoItem label="Estado" value="Linea base de desarrollo" />
        <InfoItem label="Proxima fase" value="Seleccionar API publica y estrategia de almacenamiento local" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    gap: 12,
    marginBottom: 28,
  },
  eyebrow: {
    color: '#2563EB',
    fontSize: 15,
    fontWeight: '700',
  },
  title: {
    color: '#111827',
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 36,
  },
  description: {
    color: '#4B5563',
    fontSize: 16,
    lineHeight: 24,
  },
  panel: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderRadius: 8,
    borderWidth: 1,
    gap: 18,
    padding: 20,
  },
});
