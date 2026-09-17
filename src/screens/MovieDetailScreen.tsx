import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const insets = useSafeAreaInsets();

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
