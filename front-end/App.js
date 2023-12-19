import { NavigationContainer } from '@react-navigation/native';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Mapa from './pages/Mapa';
import Favoritos from './pages/Favoritos';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <FavoritosProvider>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Mapa">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Mapa" component={Mapa} />
        <Stack.Screen name="Favoritos" component={Favoritos} />
      </Stack.Navigator>
    </NavigationContainer>
    </FavoritosProvider>
  );
}