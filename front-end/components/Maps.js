import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import ContainerFav from './ContainerFav';

const Maps = ({ onUpdateLocal }) => {
  const [region, setRegion] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [favoriteLocations, setFavoriteLocations] = useState([]);

  const fetchLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      onUpdateLocal({ latitude, longitude });
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  const fetchMarkers = async () => {
    try {
      const response = await fetch('sua_api_aqui');
      const data = await response.json();
      setMarkers(data);
    } catch (error) {
      console.error('Error fetching markers:', error);
    }
  };

  const initializeFavorites = () => {
    const initialFavoriteLocations = [];
    setFavoriteLocations(initialFavoriteLocations);
  };

  const watchLocation = async () => {
    const locationWatchId = await Location.watchPositionAsync(
      { accuracy: Location.Accuracy.High, timeInterval: 1000 },
      (location) => {
        const { latitude, longitude } = location.coords;
        setRegion((prevRegion) => ({
          ...prevRegion,
          latitude,
          longitude,
        }));
        onUpdateLocal({ latitude, longitude });
      }
    );

    return () => {
      if (locationWatchId) {
        locationWatchId.remove();
      }
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchLocation();
      await fetchMarkers();
      initializeFavorites();
      const stopLocationWatch = await watchLocation();

      return () => {
        if (stopLocationWatch) {
          stopLocationWatch();
        }
      };
    };

    fetchData();
  }, [onUpdateLocal]);

  const handleFavoriteToggle = (markerId) => {
    const updatedMarkers = markers.map((marker) =>
      marker.id === markerId ? { ...marker, favorited: !marker.favorited } : marker
    );
    setMarkers(updatedMarkers);

    const updatedFavoriteLocations = updatedMarkers.filter((marker) => marker.favorited);
    setFavoriteLocations(updatedFavoriteLocations);
  };

  return (
    <View style={{ flex: 1 }}>
      {region ? (
        <>
          <MapView
            style={styles.map}
            region={region}
            showsUserLocation={true}
            followsUserLocation={true}
          >
            {markers.map((marker) => (
              <Marker
                key={marker.id}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                title={marker.name}
                description={marker.description}
              />
            ))}
          </MapView>
          <ContainerFav favoriteLocations={favoriteLocations} onToggleFavorite={handleFavoriteToggle} />
        </>
      ) : (
        <Text style={styles.loadingText}>Carregando mapa...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Maps;