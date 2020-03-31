import React, { Component } from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase'
import gitLab from '../../assets/colect.png';
import AsyncStorage from '@react-native-community/async-storage';

// import { Container } from './styles';
var token = ''
export default class pages extends Component {
  async componentDidMount() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyAcQ8jTZK6PPeQRKaO2txOmvpbRG7AqHSU",
      authDomain: "series-3e08b.firebaseapp.com",
      databaseURL: "https://series-3e08b.firebaseio.com",
      projectId: "series-3e08b",
      storageBucket: "",
      messagingSenderId: "779861796924",
      appId: "1:779861796924:web:da506c2ada262d605a3b39"
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    if (await AsyncStorage.getItem('currentUser')) {
      this.props.navigation.replace('home')
    } else {
      this.props.navigation.replace('Login')
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={gitLab}
        // aspectRatio={1}
        // resizeMode='stretch'
        />
        <ActivityIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252C4A',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 80,
    height: 95,
    marginBottom: 10
  },

})