import React, { Component } from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  Alert,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import gitLab from '../../assets/colect.png';
const { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import firebase from 'firebase';
// import console from ('console');
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mail: '',
      senha: '',
      confSenha: '',
      isLoading: false,
      message: '',
      isTrue: true

    }
  }

  onChangeHandler(field, value) {
    this.setState({
      [field]: value
    });
  }

  async tryCreate() {
    this.setState({ isLoading: true })
    const { mail, senha, confSenha } = this.state
    if (mail == '' || senha == '' || confSenha == '') {
      Alert.alert(
        'Error',
        'Preencha todos os campos.' ,
        /* Text */
      );
      this.setState({ isLoading: false })
    }
    else if (senha != confSenha) {
      Alert.alert(
        'Error',
        'Senhas não coincidem.' ,
        /* Text */
      );
      this.setState({ isLoading: false })
    } else if (senha.length < 6) {
      Alert.alert(
        'Error',
        'Sua senha deve conter no mínimo 6 caracteres.' ,
        /* Text */
      );
      this.setState({ isLoading: false })
    } else {
      firebase.auth()
        .createUserWithEmailAndPassword(mail,
          senha)
        .then(async user => {
          Alert.alert(
            'Sucesso',
            'Usuario cadastrado com sucesso.',
            /* Teste */
          );
          const { currentUser } = firebase.auth();
          const id = currentUser.uid;
          const db = firebase.database();
          const dados = await AsyncStorage.getItem('dados')
          const itens = JSON.parse(dados);
          await db.ref(`/${id}/dados`).set(itens)
          // this.setState({ message: 'Sucesso' })
          this.setState({ isLoading: false })
          this.props.navigation.navigate('Login')
          // console.log('usuario autenticado')
        })
        .catch(error => {
          // const { Error } = error
          const errorCode = error.code;
          const errorMessage = error.message;

          // console.log(errorMessage)
          if (errorMessage === 'The email address is badly formatted.') {
            Alert.alert(
              'Error',
              'O endereço de email está mal formatado.' ,
              /* Text */
            );
            this.setState({ isLoading: false })
          } else if (errorMessage === 'The email address is already in use by another account.') {
            Alert.alert(
              'Error',
              'O endereço de email já está sendo usado por outra conta.' ,
              /* Text */
            );
            this.setState({ isLoading: false })
          }

        })
    }
  }
  async verSenha() {
    if (this.state.isTrue == false) {
      this.setState({ isTrue: true })
    } else {
      this.setState({ isTrue: false })
    }
  }
  renderButton() {
    if (this.state.isLoading)
      return <ActivityIndicator style={{ marginTop: 40 }} />;

    return (
      <TouchableOpacity
        onPress={() => this.tryCreate()}
        style={styles.botao}>
        <Text style={styles.textButton}>Criar Usuario</Text>
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
        <Image
          style={styles.logo}
          source={gitLab}
        // aspectRatio={1}
        // resizeMode='stretch'
        />
        <View style={styles.viewInput}>
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            placeholder='Email'
            value={this.state.mail}
            placeholderTextColor='#8F98C1'
            onChangeText={value => this.onChangeHandler('mail',
              value)}
          />
        </View>
        <View style={styles.viewInput}>
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            placeholder='Senha'
            secureTextEntry={this.state.isTrue}
            placeholderTextColor='#8F98C1'
            value={this.state.senha}
            onChangeText={value => this.onChangeHandler('senha',
              value)}
          />
          <TouchableOpacity onPress={() => this.verSenha()}>
            <Icon name="eye" size={25} color="#8F98C1" style={{ marginRight: 5 }} />
          </TouchableOpacity>
        </View>
        <View style={styles.viewInput}>
          <TextInput
            style={styles.input}
            autoCapitalize='none'
            placeholder='Confirmar senha'
            secureTextEntry={this.state.isTrue}
            placeholderTextColor='#8F98C1'
            value={this.state.confSenha}
            onChangeText={value => this.onChangeHandler('confSenha',
              value)}
          />
          {/* <TouchableOpacity onPress={() => this.verSenha()}>
            <Icon name="eye" size={25} color="#8F98C1" style={{ marginRight: 5 }} />
          </TouchableOpacity> */}
        </View>
        {this.renderButton()}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    justifyContent: 'center',
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
    marginTop: 10,
  },
  logo: {
    width: 70,
    height: 85,
  },
  viewInput: {
    height: 50,
    width: 250,
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