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
import gitLab from '../../assets/colect.png';
import AsyncStorage from '@react-native-community/async-storage';

// import fundo from '../../assets/fundoLogin.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
Icon.loadFont();
const { width, height } = Dimensions.get('window');
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nome: '',
      mail: '',
      senha: '',
      isLoading: false,
      message: '',
      isTrue: true
    }
  }
  async componentDidMount() {
    const login = await AsyncStorage.getItem('login')
    const senha = await AsyncStorage.getItem('senha')
    await this.setState({ mail: login, senha: senha })
  }

  async verSenha() {
    if (this.state.isTrue == false) {
      this.setState({ isTrue: true })
    } else {
      this.setState({ isTrue: false })
    }
  }
  // faz a autenticaçao quando clica logar
  async tryLogin() {
    // this.props.navigation.navigate('Inicio', {
    //   nome: this.state.nome
    // });
    this.setState({ isLoading: true })
    const { mail, senha } = this.state
    firebase.auth()
      .signInWithEmailAndPassword(mail,
        senha).then(async (response) => {
          // console.log(response.user.uid)
          await AsyncStorage.setItem('currentUser', response.user.uid)
          await AsyncStorage.setItem('login', mail)
          await AsyncStorage.setItem('senha', senha)
          this.props.navigation.replace('home', {
            nome: 'teste'
          });
        }).catch(error => {
          Alert.alert('Error',
            'Usuario e/ou senha incorreto');
          this.setState({ isLoading: false })
        })
  }

  renderButton() {
    if (this.state.isLoading)
      return <ActivityIndicator style={{ marginTop: 40 }} />;

    return (
      <TouchableOpacity
        onPress={() => this.tryLogin()}
        style={styles.botao}
      >
        <Text style={styles.textButton}>Entrar</Text>
      </TouchableOpacity>
      // <Button
      //   title='Criar Conta'
      //   onPress={() => this.tryCreate()}
      // />
    );
  }
  onChangeHandler(field, value) {
    this.setState({
      [field]: value
    });
  }
  render() {
    return (
      <View style={styles.container}>
        {/* <Icon name="delete" size={20} color="#fff" /> */}
        {/* <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize='none'
          placeholder=''
          // keyboardType={'numeric'}
          placeholderTextColor='#999'
          value={this.state.nome}
          onChangeText={nome => this.setState({ nome })}
        /> */}
        <Image
          style={styles.logo}
          source={gitLab}
        // aspectRatio={1}
        // resizeMode='stretch'
        />
        <View style={styles.viewInput}>
          <TextInput
            style={styles.input}
            autoCorrect={false}
            autoCapitalize='none'
            placeholder='Email'
            placeholderTextColor='#8F98C1'
            value={this.state.mail}
            onChangeText={mail => this.setState({ mail })}
          />
          <Icon name="account" size={25} color="#8F98C1" style={{ marginRight: 5 }} />
        </View>
        <View style={styles.viewInput}>
          <TextInput
            style={styles.input}
            autoCorrect={false}
            autoCapitalize='none'
            placeholder='Senha'
            placeholderTextColor='#8F98C1'
            secureTextEntry={this.state.isTrue}
            value={this.state.senha}
            onChangeText={senha => this.setState({ senha })}
          />
          <TouchableOpacity onPress={() => this.verSenha()}>
            <Icon name="eye" size={25} color="#8F98C1" style={{ marginRight: 5 }} />
          </TouchableOpacity>
        </View>
        {this.renderButton()}
        <Text
          onPress={() => {
            this.props.navigation.navigate('Pesquisador');
          }}
          style={styles.textInsc}
        >Não tem uma conta? Crie uma!</Text>
        <Text
          onPress={() => {
            this.props.navigation.navigate('RecuperarSenha');
          }}
          style={{
            color: '#039BE5',
            fontSize: 18,
            fontWeight: 'bold'
          }}
          type='clear'
        >Esqueceu sua senha?</Text>
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