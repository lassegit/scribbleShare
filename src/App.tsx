import React from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ScribbleScreen from './screens/ScribbleScreen';
import ScribbleAdvancedScreen from './screens/ScribbleAdvancedScreen';
import GifScreen from './screens/GifScreen';

export type StackParamList = {
  Home: undefined;
  Scribble: undefined;
  ScribbleAdvanced: undefined;
  Gif: {
    gif: string;
    images: string[];
  };
};

const Stack = createNativeStackNavigator<StackParamList>();

enableScreens();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Scribble" component={ScribbleScreen} />
      <Stack.Screen
        name="ScribbleAdvanced"
        component={ScribbleAdvancedScreen}
      />
      <Stack.Screen name="Gif" component={GifScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
