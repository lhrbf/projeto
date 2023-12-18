import React, { useState } from "react";
import BarraInfMaps from "../components/BarraInfMaps";
import Maps from "../components/Maps";

const Mapa = () => {
  const [seuLocal, setSeuLocal] = useState(null);
  const [destino, setDestino] = useState('');

  const handleUpdateDestino = (novoDestino) => {
    setDestino(novoDestino);
  };

  return (
    <>
      <Maps onUpdateLocal={setSeuLocal} />
      <BarraInfMaps seuLocal={seuLocal} destino={destino} onUpdateDestino={handleUpdateDestino} />
    </>
  );
}

export default Mapa;