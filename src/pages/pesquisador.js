import React, { Component } from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  Alert,
  FlatList
} from 'react-native';
const { width, height } = Dimensions.get('window')
import { Colors } from '../config/colors'
import DatePicker from 'react-native-datepicker'
import AsyncStorage from '@react-native-community/async-storage';

// import { Container } from './styles';
let date = (new Date().getDate() > 10) ? `${new Date().getDate()}` : `0${new Date().getDate()}`
let month = ((new Date().getMonth() + 1) >= 10) ? `${(new Date().getMonth() + 1)}` : `0${(new Date().getMonth() + 1)}`
let year = new Date().getFullYear();
export default class pages extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nome: '',
      dataNasc: '01-01-1990',
      CidEst: '',
      email: '',
      fone: '',
      dataCadastro: `${date}-${month}-${year}`,
    }
  }
  renderButton() {
    if (this.state.isLoading)
      return <ActivityIndicator />;

    return (
      <TouchableOpacity
        onPress={() => this.prox()}
        style={styles.botao}
      >
        <Text style={styles.textButton}>Proximo</Text>
      </TouchableOpacity>
      // <Button
      //   title='Criar Conta'
      //   onPress={() => this.tryCreate()}
      // />
    );
  }
  async prox() {
    const { nome, dataNasc, CidEst,
      email, fone, dataCadastro
    } = this.state
    const dados = {
      nome, dataNasc, CidEst, email, fone,
      dataCadastro
    }
    if (nome == '' || CidEst == '' || email == '' || fone == '') {
      Alert.alert(
        'Error',
        'Preencha todos os campos.' ,
        /* Text */
      );
      // this.setState({ isLoading: false })
    } else {
      await AsyncStorage.setItem('dados', JSON.stringify(dados));
      await this.props.navigation.navigate('CreateUser')
    }
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.viewInput}>
            <TextInput
              style={styles.input}
              autoCorrect={false}
              autoCapitalize='none'
              placeholder='Nome'
              placeholderTextColor='#8F98C1'
              value={this.state.nome}
              onChangeText={nome => this.setState({ nome })}
            />
          </View>
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
          </View>
          <View style={styles.viewInput}>
            <TextInput
              style={styles.input}
              autoCorrect={false}
              autoCapitalize='none'
              placeholder='Cidade de origem'
              placeholderTextColor='#8F98C1'
              value={this.state.CidEst}
              onChangeText={CidEst => this.setState({ CidEst })}
            />
          </View>
          <View style={styles.viewInput}>
            <TextInput
              style={styles.input}
              autoCorrect={false}
              autoCapitalize='none'
              placeholder='Telefone'
              placeholderTextColor='#8F98C1'
              value={this.state.fone}
              onChangeText={fone => this.setState({ fone })}
            />
          </View>
          <View style={{ marginTop: 10, marginLeft: 10 }}>
            <Text style={styles.data}>Data de Nascimento: </Text>
            <DatePicker
              style={{ width: width - 60 }}
              date={this.state.dataNasc}
              androidMode="spinner"
              format="DD-MM-YYYY"
              minDate="01-01-1970"
              maxDate="01-01-2050"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
                  borderColor: '#8F98C1',
                },
                dateText: {
                  color: '#8F98C1',
                  textAlign: 'center',
                },
                // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => { this.setState({ dataNasc: date }) }}
            />
          </View>
          {this.renderButton()}
        </View>
      </ScrollView>
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
    width: width - 60,
    height: 40,
    backgroundColor: '#268AEC',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
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
    width: width - 60,
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
    width: '100%'
  },
  data: {
    // marginLeft: 8,
    marginBottom: 15,
    color: '#8F98C1',
    fontSize: 18,
  }
})


{/* <TextInput
style={styles.input}
autoCorrect={false}
autoCapitalize='none'
placeholder={item.dado}
placeholderTextColor={Colors.TEXT}
value={this.state.nome}
onChangeText={nome => this.setState({ nome })}
/> */}