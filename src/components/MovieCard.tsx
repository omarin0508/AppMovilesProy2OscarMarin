import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Movie } from '../types/movie';

const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w342';

interface MovieCardProps {
  movie: Movie;
  onPress: () => void;
}

export function MovieCard({ movie, onPress }: MovieCardProps) {
  const releaseYear = movie.releaseDate ? movie.releaseDate.slice(0, 4) : 'Sin fecha';

  return (
    <Pressable
      accessibilityLabel={`Ver detalle de ${movie.title}`}
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      {movie.posterPath ? (
        <Image
          accessibilityLabel={`Poster de ${movie.title}`}
          source={{ uri: `${POSTER_BASE_URL}${movie.posterPath}` }}
          style={styles.poster}
        />
      ) : (
        <View style={[styles.poster, styles.posterPlaceholder]}>
          <Text style={styles.placeholderText}>Sin poster</Text>
        </View>
      )}

      <View style={styles.details}>
        <Text numberOfLines={2} style={styles.title}>
          {movie.title}
        </Text>
        <Text style={styles.year}>{releaseYear}</Text>
        <View style={styles.ratingRow}>
          <Text style={styles.ratingLabel}>Calificacion</Text>
          <Text style={styles.rating}>{movie.voteAverage.toFixed(1)} / 10</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 168,
    backgroundColor: '#FFFFFF',
    borderColor: '#DDE2E8',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  cardPressed: {
    opacity: 0.78,
  },
  poster: {
    width: 112,
    height: 168,
    backgroundColor: '#DDE2E8',
  },
  posterPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  placeholderText: {
    color: '#667085',
    fontSize: 13,
    textAlign: 'center',
  },
  details: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    color: '#182230',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
  },
  year: {
    color: '#667085',
    fontSize: 14,
    marginTop: 6,
  },
  ratingRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 18,
  },
  ratingLabel: {
    color: '#667085',
    fontSize: 13,
  },
  rating: {
    color: '#176B45',
    fontSize: 14,
    fontWeight: '700',
  },
});
