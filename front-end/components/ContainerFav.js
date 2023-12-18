import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const ContainerFav = ({ favorites, onLocationPress, onRemoveFavorite }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Locais Favoritados</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => onLocationPress(item)}
            onLongPress={() => onRemoveFavorite(item)}
          >
            <Text>{item.name}</Text>
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
    padding: 2,
    width: 300,
    borderBottomWidth: 1,
    borderBottomColor: "orange",
    color: "green",
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    gap: 3,
  },
});

export default ContainerFav;