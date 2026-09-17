import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const projectSteps = [
  {
    title: '1. Explorar películas',
    description: 'La aplicación consulta películas desde TMDB mediante una API REST.',
  },
  {
    title: '2. Ver información',
    description:
      'Cada card muestra los datos principales. Al tocar una película podemos ver su información completa.',
  },
  {
    title: '3. Guardar favoritos',
    description: 'Desde el detalle podemos agregar una película a Mis favoritos.',
  },
  {
    title: '4. Persistencia local',
    description:
      'Los favoritos se guardan en SQLite dentro del dispositivo. Por eso se mantienen aunque cerremos y volvamos a abrir la aplicación.',
  },
  {
    title: '5. Eliminar favoritos',
    description:
      'Desde una película guardada podemos quitarla y la base de datos actualiza nuestros favoritos.',
  },
];

export function ProjectHelpScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={[styles.content, { paddingBottom: Math.max(insets.bottom, 32) }]}
      style={styles.screen}
    >
      <Text style={styles.title}>Explicación del proyecto</Text>
      <Text style={styles.introduction}>
        Movie Explorer permite consultar películas reales, ver su información y guardar favoritas
        de forma local en el dispositivo.
      </Text>

      <View style={styles.steps}>
        {projectSteps.map((step) => (
          <View key={step.title} style={styles.stepCard}>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepDescription}>{step.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.technicalSection}>
        <Text style={styles.technicalTitle}>Estructura técnica</Text>
        <Text style={styles.technicalDescription}>
          TMDB proporciona los datos externos, Context API administra el estado de la aplicación y
          SQLite almacena los favoritos localmente.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F4F6F8',
  },
  content: {
    padding: 20,
  },
  title: {
    color: '#182230',
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 36,
  },
  introduction: {
    color: '#475467',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
  },
  steps: {
    gap: 12,
    marginTop: 24,
  },
  stepCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DDE2E8',
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  stepTitle: {
    color: '#182230',
    fontSize: 17,
    fontWeight: '700',
  },
  stepDescription: {
    color: '#475467',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 6,
  },
  technicalSection: {
    borderTopColor: '#DDE2E8',
    borderTopWidth: 1,
    marginTop: 24,
    paddingTop: 20,
  },
  technicalTitle: {
    color: '#182230',
    fontSize: 18,
    fontWeight: '700',
  },
  technicalDescription: {
    color: '#475467',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
});
