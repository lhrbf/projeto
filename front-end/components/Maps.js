import React, { useEffect, useState } from 'react';
import { View, Text, Modal, Button, StyleSheet, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import geoJSONData from './Geo';
import Icon from 'react-native-vector-icons/FontAwesome5';
import haversine from 'haversine';

const Maps = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [schools, setSchools] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    requestLocation();
    setSchools(geoJSONData.features);
  }, []);

  const requestLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    } catch (error) {
      console.error('Error getting current location:', error);
      setErrorMsg('Error getting current location');
    }
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

  const openGoogleMaps = () => {
    if (selectedPoint && selectedPoint.geometry && selectedPoint.geometry.coordinates) {
      const { latitude, longitude } = selectedPoint.geometry.coordinates[0][0];
      const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

      Linking.openURL(url);
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
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          >
            <Icon name="walking" size={35} color="#097BF4"/>
          </Marker>
        )}
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
        }}>
        <View style={styles.modalContent}>
          <Text style={styles.text}>{selectedPoint && selectedPoint.properties.escola_nome}</Text>
          <Text style={styles.text}>{selectedPoint && selectedPoint.properties.endereco}</Text>
          {distance && <Text style={styles.text}>Distância: {distance.toFixed(2)} km</Text>}
          <View style={styles.botaoContainer}>
            <Button title="Fechar" onPress={() => setModalVisible(false)} />
            {selectedPoint && (
              <Button
                title="Abrir no Google Maps"
                onPress={() => openGoogleMaps(selectedPoint)}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: "#F8F8FF",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 2,
  },
  text: {
    fontSize: 17,
    color: "#FF7514",
    marginBottom: 10,
  },
  botaoContainer: {
    marginTop: 20,
    gap: 10,
  },
});

export default Maps;