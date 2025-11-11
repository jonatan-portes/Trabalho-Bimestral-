import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TelaCadastro from './TelaCadastro';
import TelaHome from './TelaHome';
import TelaCamera from './TelaCamera';
import TelaLogin from './TelaLogin'; // 1. IMPORTE A TELA NOVA

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"> 
        <Stack.Screen name="Login" component={TelaLogin} options={{ title: 'Login' }} />
        <Stack.Screen name="Cadastro" component={TelaCadastro} options={{ title: 'Abra sua Conta' }} />
        <Stack.Screen name="Home" component={TelaHome} options={{ title: 'Sua Conta' }} />
        <Stack.Screen name="Camera" component={TelaCamera} options={{ title: 'Enviar Documento' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

