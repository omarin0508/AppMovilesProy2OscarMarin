import { StyleSheet, Text, View } from 'react-native';

interface InfoItemProps {
  label: string;
  value: string;
}

export function InfoItem({ label, value }: InfoItemProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  label: {
    color: '#5E6472',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  value: {
    color: '#1F2937',
    fontSize: 17,
    lineHeight: 24,
  },
});
