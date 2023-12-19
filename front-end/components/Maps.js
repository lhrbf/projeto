import React, { useEffect, useState } from 'react';
import { View, Text, Modal, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { haversine } from 'haversine-geolocation';
import geoJSONData from './Geo';  

function Maps() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [schools, setSchools] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
  (async () => {
    let { status } = await requestLocationPermission();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    } catch (error) {
      console.error('Error getting current location:', error);
      setErrorMsg('Error getting current location');
    }
  })();
}, []);

  useEffect(() => {
    setSchools(geoJSONData.features);
  }, []);

  const requestLocationPermission = async () => {
    return await Location.requestForegroundPermissionsAsync();
  };

  const handleMarkerPress = (point) => {
    setSelectedPoint(point);
    calculateDistance(point);
    setModalVisible(true);
  };

  const calculateDistance = (point) => {
    if (location && point) {
      const userCoordinates = {
        latitude: location.latitude,
        longitude: location.longitude,
      };

      const pointCoordinates = {
        latitude: point.geometry.coordinates[0][0][1],
        longitude: point.geometry.coordinates[0][0][0],
      };

      const distance = haversine(userCoordinates, pointCoordinates, { unit: 'km' });
      setDistance(distance);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: location ? location.latitude : 0,
          longitude: location ? location.longitude : 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {schools.map((school, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: school.geometry.coordinates[0][0][1],
              longitude: school.geometry.coordinates[0][0][0],
            }}
            onPress={() => handleMarkerPress(school)}
          />
        ))}
      </MapView>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>{selectedPoint && selectedPoint.properties.escola_nome}</Text>
          <Text>{selectedPoint && selectedPoint.properties.endereco}</Text>
          {distance && <Text>Distância: {distance.toFixed(2)} km</Text>}
          <Button title="Fechar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

export default Maps;