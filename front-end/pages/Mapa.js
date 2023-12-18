import React, { useState } from "react";
import Maps from "../components/Maps";
import Perfil from "../components/Perfil"

const Mapa = () => {
  const [seuLocal, setSeuLocal] = useState(null);
  const [destino, setDestino] = useState('');

  const handleUpdateDestino = (novoDestino) => {
    setDestino(novoDestino);
  };

  return (
    <>
      <Maps onUpdateLocal={setSeuLocal} />
      <Perfil />
    </>
  );
}

export default Mapa;