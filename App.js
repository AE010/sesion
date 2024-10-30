import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

const App = () => {
  const [imageUri, setImageUri] = useState('https://static.vecteezy.com/system/resources/previews/005/005/840/non_2x/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg');

  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (cameraStatus.status !== 'granted' || libraryStatus.status !== 'granted') {
        Alert.alert("Permisos denegados", "Se requieren permisos para acceder a la cámara y galería.");
      }
    })();
  }, []);

  const pickImageGaleria = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets[0].uri) {
        setImageUri(result.assets[0].uri);
      } else {
        Alert.alert("Selección cancelada", "No se seleccionó ninguna imagen.");
      }
    } catch (error) {
      console.error("Error al seleccionar imagen de la galería:", error);
    }
  };

  const pickImageFoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets[0].uri) {
        setImageUri(result.assets[0].uri);
      } else {
        Alert.alert("Captura cancelada", "No se tomó ninguna foto.");
      }
    } catch (error) {
      console.error("Error al tomar la foto:", error);
    }
  };

  const shareImage = async () => {
    if (!imageUri) {
      Alert.alert("Error", "No hay ninguna imagen para compartir.");
      return;
    }

    try {
      await Sharing.shareAsync(imageUri);
    } catch (error) {
      console.error("Error al compartir imagen:", error);
      Alert.alert("Error al compartir", "No se pudo compartir la imagen.");
    }
  };

  return (
    <View style={style.container}>
      <View style={style.subcontainer}>
        <Text style={style.title}>Inicio de Sesion</Text>
        
        <TouchableOpacity onPress={pickImageGaleria}>
          <Image source={{ uri: imageUri }} style={style.image} />
        </TouchableOpacity>

        <TouchableOpacity onPress={shareImage} style={style.buton3}>
          <Text style={style.butontext}>COMPARTIR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.buton2} onPress={pickImageFoto}>
          <Text style={style.butontext}>TOMAR UNA FOTO</Text>
        </TouchableOpacity>

        <View style={style.subcontainer2}>
          <Text style={style.subtitle}>Nombre de usuario:</Text>
          <TextInput style={style.input} placeholder="Nombre" />

          <Text style={style.subtitle}>Contraseña:</Text>
          <TextInput style={style.input} placeholder="Contraseña" secureTextEntry={true} />
        </View>

        <TouchableOpacity style={style.buton} onPress={() => Alert.alert('Usuario Registrado')}>
          <Text style={style.butontext}>ACEPTAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  subcontainer2: {
    marginTop: 25,
    marginBottom: 15
  },
  subcontainer: {
    borderColor: '#294AEC',
    backgroundColor: '#1E1E1F',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    borderRadius: 50
  },
  title: {
    fontSize: 20,
    fontFamily: 'monospace',
    fontWeight: '500',
    color: '#E0FFFF'
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'monospace',
    color: '#87CEFA'
  },
  image: {
    height: 180,
    width: 180,
    borderRadius: 5,
    marginTop: 25,
    marginBottom: 15,
    borderColor: '#294AEC',
    borderWidth: 3
  },
  input: {
    padding: 5,
    height: 25,
    width: 200,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    color: '#000000',
    marginTop: 5,
    marginBottom: 10,
    borderColor: '#5975FE',
    borderWidth: 2,
    fontFamily: 'monospace'
  },
  buton: {
    height: 30,
    width: 90,
    backgroundColor: "#191970",
    borderRadius: 8,
    borderColor: '#5975FE',
    borderWidth: 2.5,
    justifyContent: "center",
    alignItems: 'center'
  },
  buton2: {
    height: 30,
    width: 120,
    color: '#FFFFFF',
    backgroundColor: "#191970",
    borderRadius: 8,
    borderColor: '#5975FE',
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: 'center'
  },
  buton3: {
    padding: 5,
    marginBottom: 10,
    height: 30,
    width: 90,
    backgroundColor: "#191970",
    borderRadius: 8,
    borderColor: '#5975FE',
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: 'center'
  },
  butontext: {
    color: "#E0FFFF",
    fontSize: 12,
    justifyContent: "center"
  }
});

export default App;
