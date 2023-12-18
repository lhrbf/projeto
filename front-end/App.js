import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, } from 'react-native';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Mapa from './pages/Mapa';
import Favoritos from './pages/Favoritos';
import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Data from './data.csv';

const [data, setData] = useState([]);

export default function App() {

  
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file,{header:true, complete: (results) => {setData(results.data)}})
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(Data);
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8")
      const csvData = decoder.decode(result.value);
      const parsedData = Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true
      }).data;
    };
    fetchData();
  }, []);

  return (
    <><NavigationContainer>
      <Stack.Navigator initialRouteName="Mapa">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Mapa" component={Mapa} />
        <Stack.Screen name="Favoritos" component={Favoritos} />
      </Stack.Navigator>
    </NavigationContainer>
    
    <React.Fragment>
        <input type="file" accept=".csv" onChange={handleFileUpload} />
        {data.length ?(
          <table className = "table">
            <thead>
              <tr>
                <th>Local</th>
                <th>logradouro</th>
                <th>bairro</th>
              </tr>
              <tbody>
                {data.map((row, index) => (
                  <tr key ={index}>
                    <td>{row.Local}</td>
                    <td>{row.logradouro}</td>
                    <td>{row.bairro}</td>
                  </tr>
                ))}
              </tbody>
              </thead>
          </table>
        ):null}
      </React.Fragment></>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
