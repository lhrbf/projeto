// ContainerFav.js
import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFavoritos } from './FavoritosContext';

const ContainerFav = ({ onLocationPress }) => {
  const { favorites, removeFavorite } = useFavoritos();

  const handleLocationPress = (item) => {
    onLocationPress(item.id);
    console.log(`Pressed on location: ${item.name}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Locais Favoritados</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => handleLocationPress(item)}
          >
            <View style={styles.itemContent}>
              <Text>{item.name}</Text>
            </View>
            <TouchableOpacity
              style={styles.removeIcon}
              onPress={() => removeFavorite(item.id)}
            >
              <Icon name="trash" size={25} color="red" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 90,
    left: "24%",
    width: 200,
    maxHeight: 300,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    elevation: 4,
    zIndex: 1,
    borderWidth:2,
    borderColor: "orange",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 5,
    alignSelf: 'center',
    color: "green",
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'orange',
    gap: 2,
  },
  itemContent: {
    flex: 1,
  },
});

export default ContainerFav;