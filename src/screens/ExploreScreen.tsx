import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MovieCard } from '../components/MovieCard';
import { useAppContext } from '../context/AppContext';
import { RootStackParamList } from '../navigation/types';

type ExploreScreenProps = NativeStackScreenProps<RootStackParamList, 'Explore'>;

export function ExploreScreen({ navigation }: ExploreScreenProps) {
  const { movies, loading, error, loadMovies } = useAppContext();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    void loadMovies();
  }, [loadMovies]);

  if (loading && movies.length === 0) {
    return (
      <View style={styles.centeredState}>
        <ActivityIndicator color="#C2412D" size="large" />
        <Text style={styles.stateTitle}>Cargando peliculas...</Text>
      </View>
    );
  }

  if (error && movies.length === 0) {
    return (
      <View style={styles.centeredState}>
        <Text style={styles.stateTitle}>No pudimos cargar las peliculas</Text>
        <Text style={styles.errorMessage}>{error}</Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => void loadMovies()}
          style={({ pressed }) => [styles.retryButton, pressed && styles.retryButtonPressed]}
        >
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={[
        styles.listContent,
        { paddingBottom: Math.max(insets.bottom, 32), paddingTop: Math.max(insets.top + 12, 20) },
      ]}
      data={movies}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      keyExtractor={(movie) => movie.id.toString()}
      ListEmptyComponent={<Text style={styles.emptyMessage}>No hay peliculas disponibles.</Text>}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.eyebrow}>TMDB</Text>
          <Text style={styles.title}>Explorar peliculas</Text>
          <Text style={styles.subtitle}>Titulos populares para descubrir hoy.</Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.navigate('Favorites')}
            style={({ pressed }) => [styles.favoritesButton, pressed && styles.favoritesButtonPressed]}
          >
            <Text style={styles.favoritesButtonText}>Mis favoritos</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.navigate('ProjectHelp')}
            style={({ pressed }) => [styles.helpButton, pressed && styles.helpButtonPressed]}
          >
            <Text style={styles.helpButtonText}>Explicación del proyecto</Text>
          </Pressable>
          {error ? <Text style={styles.inlineError}>{error}</Text> : null}
        </View>
      }
      refreshing={loading}
      renderItem={({ item }) => (
        <MovieCard movie={item} onPress={() => navigation.navigate('MovieDetail', { movie: item })} />
      )}
      onRefresh={() => void loadMovies()}
    />
  );
}

const styles = StyleSheet.create({
  centeredState: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 28,
  },
  stateTitle: {
    color: '#182230',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 16,
    textAlign: 'center',
  },
  errorMessage: {
    color: '#667085',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#C2412D',
    borderRadius: 6,
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  retryButtonPressed: {
    backgroundColor: '#9E3424',
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  listContent: {
    padding: 20,
  },
  separator: {
    height: 14,
  },
  header: {
    marginBottom: 22,
  },
  eyebrow: {
    color: '#C2412D',
    fontSize: 13,
    fontWeight: '800',
  },
  title: {
    color: '#182230',
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 38,
    marginTop: 4,
  },
  subtitle: {
    color: '#667085',
    fontSize: 16,
    lineHeight: 23,
    marginTop: 4,
  },
  favoritesButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#182230',
    borderRadius: 6,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  favoritesButtonPressed: {
    backgroundColor: '#344054',
  },
  favoritesButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  helpButton: {
    alignSelf: 'flex-start',
    borderColor: '#667085',
    borderRadius: 6,
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  helpButtonPressed: {
    backgroundColor: '#E8ECEF',
  },
  helpButtonText: {
    color: '#344054',
    fontSize: 14,
    fontWeight: '700',
  },
  inlineError: {
    color: '#B42318',
    fontSize: 14,
    marginTop: 12,
  },
  emptyMessage: {
    color: '#667085',
    fontSize: 15,
    paddingVertical: 40,
    textAlign: 'center',
  },
});
