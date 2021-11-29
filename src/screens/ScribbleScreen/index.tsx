import React from 'react';
import {
  View,
  StyleSheet,
  AppRegistry,
  SafeAreaView,
  Button,
} from 'react-native';
import { SketchCanvas } from '@terrylinla/react-native-sketch-canvas';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../App';

type Props = NativeStackScreenProps<StackParamList, 'Scribble'>;

const ScribbleScreen = ({ navigation }: Props) => {
  const hasInitialImageBeenAdded = React.useRef(false);
  const sketchRef = React.createRef<SketchCanvas>();
  const [base64Arr, setBase64Arr] = React.useState<string[]>([]);

  const onStrokeEnd = () => {
    if (sketchRef.current) {
      const draw = sketchRef.current.getPaths();

      console.log(draw[0]);

      sketchRef.current.getBase64(
        'png',
        false,
        false,
        false,
        false,
        (error, result) => {
          if (error) {
            console.error(error);
            return;
          }

          if (result) {
            setBase64Arr([...base64Arr, result]);
          }
        },
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Button
          title="Undo"
          onPress={() => {
            if (sketchRef.current) {
              sketchRef.current.undo();
              setBase64Arr(base64Arr.slice(0, base64Arr.length - 1));
            }
          }}
        />
        <Button
          title="Clear"
          onPress={() => {
            if (sketchRef.current) {
              sketchRef.current.clear();
              setBase64Arr([]);
              onStrokeEnd();
            }
          }}
        />
        <Button
          title="Save"
          onPress={() => {
            fetch('http://localhost:3000/generate-gif', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ images: base64Arr }),
            })
              .then(res => res.json())
              .then(data => {
                console.log(data);
                const { gif, images } = data;
                navigation.navigate('Gif', { gif, images });
              })
              .catch(err => {
                console.error(err);
              });
          }}
        />
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <SketchCanvas
          style={{ flex: 1 }}
          onStrokeEnd={onStrokeEnd}
          ref={sketchRef}
          onStrokeStart={() => {
            if (hasInitialImageBeenAdded.current) {
              return;
            }

            hasInitialImageBeenAdded.current = true;
            onStrokeEnd();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('ScribbleScreen', () => ScribbleScreen);

export default ScribbleScreen;
