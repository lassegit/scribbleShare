import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Image, SafeAreaView, Text, View, ScrollView } from 'react-native';
import { StackParamList } from '../App';

type Props = NativeStackScreenProps<StackParamList, 'Gif'>;

const GifScreen = ({ route }: Props) => {
  const { params } = route;
  const { gif, images } = params;
  console.log('GifScreen', gif, images);
  const ratio = 1170 / 2044;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ alignItems: 'center', paddingTop: 20 }}>
          <Text>Created GIF:</Text>
          <Image
            source={{ uri: gif }}
            style={{ width: 400 * ratio, height: 400 }}
          />
        </View>
        <View style={{ alignItems: 'center', paddingTop: 20 }}>
          <Text>Images used to create GIF:</Text>
          {images.map(image => (
            <Image
              key={image}
              source={{ uri: image }}
              style={{ width: 400 * ratio, height: 400, marginBottom: 20 }}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GifScreen;
