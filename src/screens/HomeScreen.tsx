import React from 'react';
import { Text, SafeAreaView, View, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../App';

type Props = NativeStackScreenProps<StackParamList, 'Home'>;

const HomeScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', paddingTop: 20 }}>
        <Text>Home Screen</Text>
        <Button
          title="Simple Scribble"
          onPress={() => navigation.navigate('Scribble')}
        />
        <Button
          title="Advanced Scribble"
          onPress={() => navigation.navigate('ScribbleAdvanced')}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
