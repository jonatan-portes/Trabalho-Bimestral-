import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, ScrollView, TextInput, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Saudacao from './Componentes';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import TelaHome from './TelaHome';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Cadastro">
      <Stack.Screen name="Cadastro" component={TelaCadastro} />
      <Stack.Screen name="Home" component={TelaHome} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

