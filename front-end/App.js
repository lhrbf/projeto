import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, } from 'react-native';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Mapa from './pages/Mapa';
import Favoritos from './pages/Favoritos';

export default function App() {
  return (
    <NavigationContainer>
          <Stack.Navigator initialRouteName= "Mapa">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
            <Stack.Screen name="Mapa" component={Mapa} />
            <Stack.Screen name="Favoritos" component={Favoritos} />
        </Stack.Navigator>
    </NavigationContainer>
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
