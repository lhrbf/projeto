import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const ContainerFav = ({ favoriteLocations, onToggleFavorite }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Locais Favoritos</Text>
      {favoriteLocations.length > 0 ? (
        <FlatList
          data={favoriteLocations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.favoriteItem} onPress={() => onToggleFavorite(item.id)}>
              <Text>{item.name}</Text>
              <Icon name="star" size={20} color="gold" />
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noFavoritesText}>Nenhum local favorito.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    elevation: 3,
  },
  header: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  favoriteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  favoriteText: {
    flex: 1,
    marginRight: 10,
  },
  noFavoritesText: {
    fontStyle: "italic",
    color: "gray",
  },
});

export default ContainerFav;