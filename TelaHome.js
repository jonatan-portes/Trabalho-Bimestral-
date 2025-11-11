import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View, Button, Image, ScrollView, TextInput, Alert, FlatList, ActivityIndicatorBase } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Saudacao from './Componentes';
import {database} from './firebase';
import {ref,set,onValue,get} from 'firebase/database';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

function TelaHome({route}) {
  const navigation = useNavigation();
  const { dados } = route.params;

  return (
    <View style={styles.containerDados}>
      <Text style={styles.dadosTitle}>Cadastro Realizado!</Text>
      <Text>Nome:</Text>
      <Text style={styles.dadosInfo}>{dados.nome}</Text>
      <Text>CPF:</Text>
      <Text style={styles.dadosInfo}>{dados.cpf}</Text>
      <Text>Email:</Text>
      <Text style={styles.dadosInfo}>{dados.email}</Text>
      <Text>CEP:</Text>
      <Text style={styles.dadosInfo}>{dados.cep}</Text>
    </View>
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