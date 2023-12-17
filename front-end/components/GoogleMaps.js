import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import ContainerFav from './ContainerFav';

const GoogleMaps = ({ onUpdateLocal }) => {
  const [region, setRegion] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [favoriteLocations, setFavoriteLocations] = useState([]);

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        onUpdateLocal({ latitude, longitude });
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    fetch('sua_api_aqui')
      .then(response => response.json())
      .then(data => setMarkers(data))
      .catch(error => console.error('Erro ao obter locais da API:', error));

    const initialFavoriteLocations = [];
    setFavoriteLocations(initialFavoriteLocations);

    return () => Geolocation.clearWatch(watchId);
  }, [onUpdateLocal]);

  const handleFavoriteToggle = (markerId) => {
    const updatedMarkers = markers.map(marker => (
      marker.id === markerId ? { ...marker, favorited: !marker.favorited } : marker
    ));
    setMarkers(updatedMarkers);

    const updatedFavoriteLocations = updatedMarkers.filter(marker => marker.favorited);
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
            {markers.map(marker => (
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
          <ContainerFav
            favoriteLocations={favoriteLocations}
            onToggleFavorite={handleFavoriteToggle}
          />
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

export default GoogleMaps;