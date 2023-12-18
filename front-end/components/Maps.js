import React, { useState, useEffect } from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from "@react-navigation/native";

const Maps = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        setUserLocation({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    fetchLocation();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
    toggleModal();
  };

  const handleStarPress = () => {
    const updatedMarkers = markers.map((m) =>
      m.id === selectedMarker.id ? { ...m, isFavorite: !m.isFavorite } : m
    );
    setMarkers(updatedMarkers);

    if (selectedMarker.isFavorite) {
      setFavorites((prevFavorites) => [...prevFavorites, selectedMarker]);
    } else {
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav.id !== selectedMarker.id)
      );
    }

    toggleModal();
  };

  const navigateToFavorites = () => {
    navigation.navigate('Favoritos', { favorites });
  };

  return (
    <View style={styles.container}>
      {userLocation && (
        <>
          <MapView
            style={styles.map}
            region={userLocation}
            showsUserLocation
            followsUserLocation
          >
            {markers.map((marker) => (
              <Marker
                key={marker.id}
                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                title={marker.name}
                onPress={() => handleMarkerPress(marker)}
              />
            ))}
          </MapView>
          <TouchableOpacity
            style={styles.favoritesButton}
            onPress={navigateToFavorites}
          >
            <Text style={styles.favoritesButtonText}>Favoritos</Text>
          </TouchableOpacity>
          <Modal animationType="slide" transparent={true} visible={isModalVisible}>
            <View style={styles.modalContainer}>
              <TouchableOpacity style={styles.modalContent} onPress={handleStarPress}>
                <Text>{selectedMarker?.isFavorite ? 'Desfavoritar' : 'Favoritar'}</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  favoritesButton: {
    position: 'absolute',
    bottom: 20,
    right: 25,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
  },
  favoritesButtonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default Maps;