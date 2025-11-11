import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, ScrollView, TextInput, Alert } from 'react-native'; // Removido ActivityIndicator
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth } from './firebase'; 
import { signInWithEmailAndPassword } from 'firebase/auth'; 

export default function TelaLogin() {
  const navigation = useNavigation();
  const [login, setLogin] = useState(''); 
  const [senha, setSenha] = useState(''); 

  const validarLogin = ()=> {
    if (!login || !senha) {
        Alert.alert("Atenção", "Preencha e-mail e senha.");
        return;
    }
    
    signInWithEmailAndPassword(auth, login, senha)
      .then(userCredential => {
        const user = userCredential.user;
        console.log('Usuário logado:', user.email); 
        
        navigation.navigate("Home"); 
      })
      .catch(error => {
        
        alert('Erro no login: ' + error.message);
      });
  }

  const irParaCadastro = () => {
    navigation.navigate("Cadastro");
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.logo} source={{ uri:'https://logodownload.org/wp-content/uploads/2018/09/bradesco-logo-novo-2018.png'}}></Image>
      <Text style={styles.title}>Acesse sua Conta</Text>
      <TextInput onChangeText={setLogin} value={login} style={styles.input} placeholder="E-mail" />
      <TextInput onChangeText={setSenha} value={senha} secureTextEntry={true} style={styles.input} placeholder="Senha"/>
      <View style={styles.buttonContainer}>
        <Button onPress={validarLogin} color="#c52a1c" title="Entrar"></Button>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={irParaCadastro} title="Ainda não tenho conta" />
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, 
    backgroundColor: '#fff',
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 20, 
  },
  logo: {
    width: '80%', 
    height: 100, 
    resizeMode: 'contain', 
    marginBottom: 20, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20, 
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
});