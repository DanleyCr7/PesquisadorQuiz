import React, { Component } from 'react';
import firebase from 'firebase';

import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Dimensions,
  Button
} from 'react-native';

// import { Container } from './styles';
const { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class pages extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      isLoading: false,
    }
  }
  forgotPassword = (Email) => {
    this.setState({ isLoading: true })
    firebase.auth().sendPasswordResetEmail(Email)
      .then(async user => {
        await this.props.navigation.replace('Login');
        await Alert.alert('Sucesso', 'Por favor verifique seu email.')
        await this.setState({ isLoading: false })

      }).catch(error => {
        const errorMessage = error.message;
        if (errorMessage === 'The email address is badly formatted.') {
          Alert.alert(
            'Error',
            'O endereço de email está mal formatado.' ,
            /* Text */
          );
          this.setState({ isLoading: false })
        }
      })
  }
  renderButton() {
    if (this.state.isLoading)
      return <ActivityIndicator style={{ marginTop: 40 }} />;

    return (
      <TouchableOpacity
        onPress={() => this.forgotPassword(this.state.email)}
        style={styles.botao}
      >
        <Text style={styles.textButton}>Enviar email</Text>
      </TouchableOpacity>
      // <Button
      //   title='Criar Conta'
      //   onPress={() => this.tryCreate()}
      // />
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontWeight: 'bold', fontSize: 22, color: '#8F98C1', marginRight: 70, marginTop: 50 }}>Esqueceu a senha?</Text>
        <View style={styles.viewInput}>
          <TextInput
            style={styles.input}
            autoCorrect={false}
            autoCapitalize='none'
            placeholder='Email'
            placeholderTextColor='#8F98C1'
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
          <Icon name="email" size={25} color="#8F98C1" style={{ marginRight: 5 }} />
        </View>
        {this.renderButton()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#252C4A',
  },
  botao: {
    width: 250,
    height: 40,
    backgroundColor: '#268AEC',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  textButton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textInsc: {
    color: '#8F98C1',
    fontSize: 18,
    marginTop: 15,
    marginBottom: 20
  },
  logo: {
    width: 70,
    height: 85,
  },
  viewInput: {
    height: 50,
    width: width - 90,
    // backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'space-between',
    marginTop: 30,
    borderBottomWidth: 1,
    borderColor: '#8F98C1',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 18,
    color: '#8F98C1',
    width: '90%'
  },
})