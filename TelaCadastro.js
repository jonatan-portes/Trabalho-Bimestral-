import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, ScrollView, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth, database } from './firebase'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database'; 

export default function TelaCadastro() { 
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [senha, setSenha] = useState('');


  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [carregando, setCarregando] = useState(false); 

 
  const buscarCep = async () => {
    if (cep.length !== 8) return; 

    setCarregando(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        Alert.alert("Erro", "CEP não encontrado.");
        setLogradouro('');
        setBairro('');
        setCidade('');
        setUf('');
      } else {
        setLogradouro(data.logradouro);
        setBairro(data.bairro);
        setCidade(data.localidade);
        setUf(data.uf);
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível buscar o CEP.");
    }
    setLoading(false);
  };

  const confirmarCadastro = () => {
    if (!nome || !cpf || !email || !cep || !senha || !cidade) {
        Alert.alert("Erro", "Por favor, preencha todos os campos.");
        return;
    }
    
    setLoading(true);

    // 1. Autenticação Externa
    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        const uid = user.uid;

        // 2. Banco de Dados Externo
        // Salva os outros dados no Realtime Database usando o UID do usuário
        set(ref(database, 'users/' + uid), {
          nome: nome,
          cpf: cpf,
          email: email,
          cep: cep,
          logradouro: logradouro,
          bairro: bairro,
          cidade: cidade,
          uf: uf,
        }).then(() => {
          setLoading(false);
          Alert.alert("Cadastro Salvo!", "Sua conta foi criada com sucesso.");
          // Navega para a Home, passando os dados (embora o ideal seria buscar do DB na Home)
          navigation.navigate("Home", { 
            dados: { nome, cpf, email, cep, logradouro, bairro, cidade, uf } 
          });
        }).catch((dbError) => {
           setLoading(false);
           Alert.alert("Erro no DB", dbError.message);
        });

      })
      .catch((authError) => {
        setLoading(false);
        // Trata erros de autenticação
        if (authError.code === 'auth/email-already-in-use') {
          Alert.alert("Erro", "Este e-mail já está em uso.");
        } else if (authError.code === 'auth/weak-password') {
           Alert.alert("Erro", "A senha deve ter no mínimo 6 caracteres.");
        } else {
           Alert.alert("Erro de Autenticação", authError.message);
        }
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.logo} source={{ uri:'https://logodownload.org/wp-content/uploads/2018/09/bradesco-logo-novo-2018.png'}}></Image>
      <Text style={styles.title}>Abra sua conta</Text>

      <TextInput onChangeText={setNome} value={nome} style={styles.input} placeholder="Nome Completo"></TextInput>
      <TextInput onChangeText={setCpf} value={cpf} style={styles.input} placeholder="CPF" keyboardType="numeric"></TextInput>
      <TextInput onChangeText={setEmail} value={email} style={styles.input} placeholder="E-mail" autoCapitalize="none"></TextInput>
      <TextInput onChangeText={setCep} value={cep} style={styles.input} placeholder='CEP' onEndEditing={buscarCep} 
      />
      
      {/* Campos de Endereço (preenchidos pela API) */}
      <TextInput value={logradouro} style={[styles.input, styles.inputDisabled]} placeholder="Rua" editable={false}></TextInput>
      <TextInput value={bairro} style={[styles.input, styles.inputDisabled]} placeholder="Bairro" editable={false}></TextInput>
      <TextInput value={cidade} style={[styles.input, styles.inputDisabled]} placeholder="Cidade" editable={false}></TextInput>
      <TextInput value={uf} style={[styles.input, styles.inputDisabled]} placeholder="Estado" editable={false}></TextInput>

      <TextInput onChangeText={setSenha} value={senha} secureTextEntry={true} style={styles.input} placeholder="Crie uma senha (mín. 6 caracteres)"></TextInput>
      
      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#c52a1c" />
        ) : (
          <Button onPress={confirmarCadastro} color="#c52a1c" title="Confirmar Cadastro"></Button>
        )}
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
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  inputDisabled: {
    backgroundColor: '#f5f5f5', // Cor de fundo para campos desabilitados
    color: '#888'
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
});