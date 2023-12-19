import React, { createContext, useContext, useState } from 'react';

const FavoritosContext = createContext();

export const FavoritosProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (favorite) => {
    setFavorites((prevFavorites) => [...prevFavorites, favorite]);
  };

  const removeFavorite = (id) => {
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== id));
  };

  return (
    <FavoritosContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritosContext.Provider>
  );
};

export const useFavoritos = () => {
  return useContext(FavoritosContext);
};