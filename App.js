import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaCadastro from './TelaCadastro';
import TelaHome from './TelaHome';
import TelaLogin from './TelaLogin'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"> 
        <Stack.Screen name="Login" component={TelaLogin} options={{ title: 'Login' }} />
        <Stack.Screen name="Cadastro" component={TelaCadastro} options={{ title: 'Abra sua Conta' }} />
        <Stack.Screen name="Home" component={TelaHome} options={{ title: 'Sua Conta' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}