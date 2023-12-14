import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Animated } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const BarraInfMaps = ({ seuLocal, onStartRoute }) => {
  const [seuDestino, onChangeSeuDestino] = useState('');
  const [panY] = useState(new Animated.Value(0));

  const onGestureEvent = Animated.event([{ nativeEvent: { translateY: panY } }], {
    useNativeDriver: false,
  });

  const onHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(panY, {
        toValue: event.nativeEvent.translationY > 0 ? 150 : 0,
        useNativeDriver: false,
      }).start();
    }
  };

  useEffect(() => {
    if (seuLocal) {
      onChangeSeuDestino(`${seuLocal.latitude}, ${seuLocal.longitude}`);
    }
  }, [seuLocal]);

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent} onHandlerStateChange={onHandlerStateChange}>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateY: panY }],
          },
        ]}
      >
        <View style={styles.dragIndicator} />
        <TextInput
          style={styles.input}
          placeholder="Seu Local"
          value={seuDestino}
          editable={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Seu destino"
          value={seuDestino}
          onChangeText={onChangeSeuDestino}
        />
        <TouchableOpacity style={styles.startRouteButton} onPress={onStartRoute}>
          <Text style={styles.startRouteButtonText}>Iniciar Rota</Text>
        </TouchableOpacity>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 5,
    padding: 10,
  },
  dragIndicator: {
    height: 5,
    width: 50,
    backgroundColor: 'gray',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 5,
  },
  input: {
    height: 40,
    marginBottom: 10,
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    borderColor: 'gray',
  },
  startRouteButton: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startRouteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default BarraInfMaps;