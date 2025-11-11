import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, View, Button, Image, ScrollView, Alert } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export default function TelaHome() {
  
  const [location, setLocation] = useState(null);
  const [errors, setErrors] = useState(null); 

  const [permission, requestPermission] = useCameraPermissions();
  const [foto, setFoto] = useState(null);
  const cameraRef = useRef(null);
  const [storagePermission, reqStoragePermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    if (!storagePermission?.granted) {
      reqStoragePermission();
    }
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
      } else {
        setErrors('Permissão negada');
        Alert.alert('Permissão negada, favor aceitar a localização');
      }
    })();
  }, []);

  const tirarFoto = async () => {
    if (cameraRef.current) {
      const fotoCapturada = await cameraRef.current.takePictureAsync();
      setFoto(fotoCapturada.uri);
    }
  }

  const salvarNaGaleria = async () => {
    try {
      if (storagePermission.status === 'granted') {
        const img = await MediaLibrary.createAssetAsync(foto);
        Alert.alert("Foto armazenada com sucesso.");
        setFoto(null); 
      } else {
        Alert.alert("É necessário autorizar para salvar na biblioteca.");
      }
    } catch (error) {
      Alert.alert("Sua foto não pode ser salva. " + error);
    }
  }

  if (!permission) {
    return <View />; 
  }
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center', margin: 20}}>
          Precisamos da sua permissão para mostrar a câmera
        </Text>
        <Button onPress={requestPermission} title="Conceder Permissão" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.containerScroll}>
      <Text style={styles.dadosTitle}>Sua Conta Bradesco</Text>
      <Text style={styles.sectionTitle}>Envio de Documento (Prova de Vida)</Text>
      <View style={styles.cameraContainer}>
        {!foto ? (
          <CameraView facing="back" ref={cameraRef} style={styles.camera} />
        ) : (
          <Image source={{ uri: foto }} style={styles.camera} />
        )}
      </View>
    
      {!foto ? (
        <Button title='Tirar Foto' onPress={tirarFoto} color="#c52a1c" />
      ) : (
        <View>
          <Button title='Salvar Foto na Galeria' onPress={salvarNaGaleria} color="#c52a1c" />
          <View style={{marginTop: 10}} />
          <Button title='Tirar foto novamente' onPress={() => setFoto(null)} />
        </View>
      )}
      <Text style={styles.sectionTitle}>Encontre Agências Próximas</Text>
      <View style={styles.mapContainer}>
        {!location ? (
          <ActivityIndicator size="large" color="#c52a1c" />
        ) : (
          <MapView style={styles.mapa} initialRegion={{latitude: location.latitude,longitude: location.longitude,latitudeDelta: 0.01,longitudeDelta: 0.01}} >
            <Marker
                coordinate={{
                latitude: location.latitude,
                longitude: location.longitude
              }}
              title='Sua Posição'
            ></Marker>
          </MapView>
        )}
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerScroll: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    padding: 25,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dadosTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#c52a1c',
    marginBottom: 20,
    textAlign: 'center',
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
    width: '100%',
  },
  cameraContainer: {
    width: 300,
    height: 300,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    backgroundColor: '#000',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  mapContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  mapa: {
    width: '100%',
    height: '100%',
  }
});