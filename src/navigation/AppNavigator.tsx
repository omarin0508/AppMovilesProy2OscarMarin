import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ExploreScreen } from '../screens/ExploreScreen';
import { MovieDetailScreen } from '../screens/MovieDetailScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen component={ExploreScreen} name="Explore" options={{ headerShown: false }} />
      <Stack.Screen component={MovieDetailScreen} name="MovieDetail" options={{ title: 'Detalle' }} />
    </Stack.Navigator>
  );
}
