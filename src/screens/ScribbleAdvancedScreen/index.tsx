import React from 'react';
import {
  AppRegistry,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';

const ScribbleAdvancedScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <RNSketchCanvas
        containerStyle={{ backgroundColor: 'transparent', flex: 1 }}
        canvasStyle={{ backgroundColor: 'transparent', flex: 1 }}
        defaultStrokeIndex={0}
        defaultStrokeWidth={5}
        undoComponent={
          <View style={styles.functionButton}>
            <Text style={{ color: 'white' }}>Undo</Text>
          </View>
        }
        clearComponent={
          <View style={styles.functionButton}>
            <Text style={{ color: 'white' }}>Clear</Text>
          </View>
        }
        strokeComponent={color => (
          <View
            style={[{ backgroundColor: color }, styles.strokeColorButton]}
          />
        )}
        strokeSelectedComponent={color => {
          return (
            <View
              style={[
                { backgroundColor: color, borderWidth: 2 },
                styles.strokeColorButton,
              ]}
            />
          );
        }}
        strokeWidthComponent={w => (
          <View style={styles.strokeWidthButton}>
            <View
              style={{
                backgroundColor: 'white',
                marginHorizontal: 2.5,
                width: Math.sqrt(w / 3) * 10,
                height: Math.sqrt(w / 3) * 10,
                borderRadius: (Math.sqrt(w / 3) * 10) / 2,
              }}
            />
          </View>
        )}
        saveComponent={
          <View style={styles.functionButton}>
            <Text style={{ color: 'white' }}>Save</Text>
          </View>
        }
        savePreference={() => {
          return {
            folder: 'RNSketchCanvas',
            filename: String(Math.ceil(Math.random() * 100000000)),
            transparent: false,
            imageType: 'png',
          };
        }}
      />
    </SafeAreaView>
  );
};

export default ScribbleAdvancedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  strokeColorButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  strokeWidthButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#39579A',
  },
  functionButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    height: 30,
    width: 60,
    backgroundColor: '#39579A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});

AppRegistry.registerComponent(
  'ScribbleAdvancedScreen',
  () => ScribbleAdvancedScreen,
);
