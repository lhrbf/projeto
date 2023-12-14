import React, { useState } from "react";
import MapScreen from "../components/MapScreen";
import BarraInfMaps from "../components/BarraInfMaps";

function Mapa() {
  const [seuLocal, setSeuLocal] = useState(null);
  const [destino, setDestino] = useState('');

  return (
    <>
      <MapScreen onUpdateLocal={setSeuLocal} />
      <BarraInfMaps seuLocal={seuLocal} destino={destino} />
    </>
  );
}

export default Mapa;