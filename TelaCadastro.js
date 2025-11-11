import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, ScrollView, TextInput, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function TelaCadastro() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [senha, setSenha] = useState('');

  const [dadosFinais, setDadosFinais] = useState('');

  useEffect(() => {
    if (dadosFinais) {
      Alert.alert("Cadastro Salvo!");
      navigation.navigate("Dados", { dados: dadosFinais });
    }
  },
  [dadosFinais]);

  const confirmarCadastro = () => {

    const dadosAtuais = {nome: nome, cpf: cpf, cep: cep, email: email, senha: senha,};
    setDadosFinais(dadosAtuais);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.logo} source={{ uri:'https://logodownload.org/wp-content/uploads/2018/09/bradesco-logo-novo-2018.png'}}></Image>
      <Text style={styles.title}>Abra sua conta</Text>
      <TextInput onChangeText={text=> setNome(text)} style={styles.input} placeholder="Nome Completo"></TextInput>
      <TextInput onChangeText={text=> setCpf(text)} style={styles.input} placeholder="CPF"></TextInput>
      <TextInput onChangeText={text=> setEmail(text)} style={styles.input} placeholder="E-mail"></TextInput>
      <TextInput onChangeText={text=> setCep(text)} style={styles.input} placeholder='CEP'></TextInput>
      <TextInput onChangeText={text=> setSenha(text)} secureTextEntry={true} style={styles.input} placeholder="Crie uma senha"></TextInput>
    <View style={styles.buttonContainer}>
      <Button onPress={confirmarCadastro} color="#c52a1c" title="Confirmar Cadastro"></Button>
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

  containerDados: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'flex-start',
    justifyContent: 'flex-start', 
    padding: 25,
  },
  dadosTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#c52a1c',
    marginBottom: 20, 
    textAlign: 'center',
    width: '100%', 
  },
  dadosLabel: {
    fontSize: 14,
    color: '#888',
    marginTop: 15,
    width: '100%',
    textAlign: 'left',
  },
  dadosInfo: {
    fontSize: 20,
    color: '#333',
    width: '100%',
    textAlign: 'left',
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 10, 
  },
});