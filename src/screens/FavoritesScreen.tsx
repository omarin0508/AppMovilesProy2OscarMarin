import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MovieCard } from '../components/MovieCard';
import { useFavoritesContext } from '../context/FavoritesContext';
import { RootStackParamList } from '../navigation/types';

type FavoritesScreenProps = NativeStackScreenProps<RootStackParamList, 'Favorites'>;

export function FavoritesScreen({ navigation }: FavoritesScreenProps) {
  const { favorites, favoritesError, favoritesLoading, loadFavorites } = useFavoritesContext();
  const insets = useSafeAreaInsets();

  if (favoritesLoading && favorites.length === 0) {
    return (
      <View style={styles.centeredState}>
        <ActivityIndicator color="#C2412D" size="large" />
        <Text style={styles.stateTitle}>Cargando favoritos...</Text>
      </View>
    );
  }

  if (favoritesError && favorites.length === 0) {
    return (
      <View style={styles.centeredState}>
        <Text style={styles.stateTitle}>No pudimos cargar tus favoritos</Text>
        <Text style={styles.errorMessage}>{favoritesError}</Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => void loadFavorites()}
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
        { paddingBottom: Math.max(insets.bottom, 32) },
        favorites.length === 0 && styles.emptyListContent,
      ]}
      data={favorites}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      keyExtractor={(movie) => movie.id.toString()}
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <Text style={styles.stateTitle}>Sin favoritos todavia</Text>
          <Text style={styles.emptyMessage}>Agrega peliculas desde su detalle.</Text>
        </View>
      }
      ListHeaderComponent={
        favorites.length > 0 ? (
          <View style={styles.header}>
            <Text style={styles.title}>Tus peliculas guardadas</Text>
            <Text style={styles.subtitle}>Disponibles desde este dispositivo.</Text>
            {favoritesError ? <Text style={styles.inlineError}>{favoritesError}</Text> : null}
          </View>
        ) : null
      }
      refreshing={favoritesLoading}
      renderItem={({ item }) => (
        <MovieCard movie={item} onPress={() => navigation.navigate('MovieDetail', { movie: item })} />
      )}
      onRefresh={() => void loadFavorites()}
    />
  );
}

const styles = StyleSheet.create({
  centeredState: {
    alignItems: 'center',
    backgroundColor: '#F4F6F8',
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
    backgroundColor: '#F4F6F8',
    flexGrow: 1,
    padding: 20,
  },
  emptyListContent: {
    justifyContent: 'center',
  },
  separator: {
    height: 14,
  },
  header: {
    marginBottom: 22,
  },
  title: {
    color: '#182230',
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 34,
  },
  subtitle: {
    color: '#667085',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 4,
  },
  inlineError: {
    color: '#B42318',
    fontSize: 14,
    marginTop: 12,
  },
  emptyState: {
    alignItems: 'center',
    padding: 28,
  },
  emptyMessage: {
    color: '#667085',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
    textAlign: 'center',
  },
});
