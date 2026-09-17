import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useFavoritesContext } from '../context/FavoritesContext';
import { RootStackParamList } from '../navigation/types';

const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

type MovieDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'MovieDetail'>;

function formatReleaseDate(releaseDate: string) {
  const [year, month, day] = releaseDate.split('-');

  if (!year || !month || !day) {
    return 'Fecha no disponible';
  }

  return `${day}/${month}/${year}`;
}

export function MovieDetailScreen({ route }: MovieDetailScreenProps) {
  const { movie } = route.params;
  const { addFavorite, favoritesError, favoritesLoading, isMovieFavorite, removeFavorite } =
    useFavoritesContext();
  const [isMutatingFavorite, setIsMutatingFavorite] = useState(false);
  const insets = useSafeAreaInsets();
  const isFavorite = isMovieFavorite(movie.id);
  const favoriteActionDisabled = favoritesLoading || isMutatingFavorite;

  const handleFavoritePress = async () => {
    if (favoriteActionDisabled) {
      return;
    }

    setIsMutatingFavorite(true);

    try {
      if (isFavorite) {
        await removeFavorite(movie.id);
      } else {
        await addFavorite(movie);
      }
    } finally {
      setIsMutatingFavorite(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.content, { paddingBottom: Math.max(insets.bottom, 28) }]}
      style={styles.screen}
    >
      {movie.posterPath ? (
        <Image
          accessibilityLabel={`Poster de ${movie.title}`}
          resizeMode="cover"
          source={{ uri: `${POSTER_BASE_URL}${movie.posterPath}` }}
          style={styles.poster}
        />
      ) : (
        <View style={[styles.poster, styles.posterPlaceholder]}>
          <Text style={styles.placeholderText}>Poster no disponible</Text>
        </View>
      )}

      <View style={styles.information}>
        <Text style={styles.title}>{movie.title}</Text>

        <Pressable
          accessibilityRole="button"
          disabled={favoriteActionDisabled}
          onPress={() => void handleFavoritePress()}
          style={({ pressed }) => [
            styles.favoriteButton,
            isFavorite && styles.removeFavoriteButton,
            favoriteActionDisabled && styles.favoriteButtonDisabled,
            pressed && !favoriteActionDisabled && styles.favoriteButtonPressed,
          ]}
        >
          <Text style={[styles.favoriteButtonText, isFavorite && styles.removeFavoriteButtonText]}>
            {isMutatingFavorite
              ? 'Actualizando...'
              : isFavorite
                ? 'Quitar de favoritos'
                : 'Agregar a favoritos'}
          </Text>
        </Pressable>
        {favoritesError ? <Text style={styles.favoriteError}>{favoritesError}</Text> : null}

        <View style={styles.metadata}>
          <View style={styles.metadataItem}>
            <Text style={styles.metadataLabel}>Estreno</Text>
            <Text style={styles.metadataValue}>{formatReleaseDate(movie.releaseDate)}</Text>
          </View>
          <View style={styles.metadataItem}>
            <Text style={styles.metadataLabel}>Calificacion</Text>
            <Text style={styles.rating}>{movie.voteAverage.toFixed(1)} / 10</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Sinopsis</Text>
        <Text style={styles.overview}>{movie.overview || 'Sin descripcion disponible.'}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F4F6F8',
  },
  content: {
    paddingBottom: 28,
  },
  poster: {
    width: '100%',
    aspectRatio: 2 / 3,
    backgroundColor: '#DDE2E8',
  },
  posterPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  placeholderText: {
    color: '#667085',
    fontSize: 15,
  },
  information: {
    padding: 20,
  },
  title: {
    color: '#182230',
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 36,
  },
  favoriteButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#C2412D',
    borderRadius: 6,
    marginTop: 18,
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 11,
  },
  removeFavoriteButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#C2412D',
    borderWidth: 1,
  },
  favoriteButtonDisabled: {
    opacity: 0.55,
  },
  favoriteButtonPressed: {
    opacity: 0.8,
  },
  favoriteButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  removeFavoriteButtonText: {
    color: '#C2412D',
  },
  favoriteError: {
    color: '#B42318',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
  },
  metadata: {
    borderBottomColor: '#DDE2E8',
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 28,
    paddingBottom: 20,
    paddingTop: 18,
  },
  metadataItem: {
    gap: 4,
  },
  metadataLabel: {
    color: '#667085',
    fontSize: 13,
  },
  metadataValue: {
    color: '#182230',
    fontSize: 15,
    fontWeight: '700',
  },
  rating: {
    color: '#176B45',
    fontSize: 15,
    fontWeight: '700',
  },
  sectionTitle: {
    color: '#182230',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 22,
  },
  overview: {
    color: '#475467',
    fontSize: 16,
    lineHeight: 25,
    marginTop: 8,
  },
});
