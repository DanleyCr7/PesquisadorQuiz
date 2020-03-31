import React, { Component } from 'react';

import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
const { width, height } = Dimensions.get('window')
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icons from 'react-native-vector-icons/FontAwesome5'
import dan from '../../assets/perfil/dan.jpg'
export default class pages extends Component {
  render() {
    const { navigation } = this.props;
    const { detail } = navigation.state.params;
    const { resposta } = detail
    const { calculos } = resposta
    // console.log(calculos)
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.perfil}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 22, color: '#fff', textAlign: 'center' }}>{detail.dado.nome}</Text>
            </View>

            <View style={styles.cidadeVIEW}>
              <Text style={styles.cidadeText}>{detail.dado.CidEst}</Text>
            </View>
          </View>
          <View style={styles.detailPerfil}>
            <Text style={{ fontWeight: 'bold', fontSize: 14, margin: 7 }}>Detalhes do voluntário</Text>
            <View style={styles.icon}>
              <Icon name="person" size={24} color="#000" style={styles.icons} />
              <Text> {detail.dado.nome}</Text>
            </View>
            <View style={styles.icon}>
              <Icons name="weight" size={24} color="#000" style={styles.icons} />
              <Text> {detail.dado.peso}KG</Text>
              <Icons name="tape" size={24} color="#000" style={styles.icons} />
              <Text> {detail.dado.altura}</Text>

            </View>
            <View style={styles.icon}>
              <Icon name="date-range" size={24} color="#000" style={styles.icons} />
              <Text> Data de Nascimento: </Text>
              <Text> {detail.dado.dataNasc}</Text>
            </View>
            <View style={styles.icon}>
              <Icon name="email" size={24} color="#000" style={styles.icons} />
              <Text> {detail.dado.email}</Text>
            </View>
            <View style={styles.icon}>
              <Icon name="call" size={24} color="#000" style={styles.icons} />
              <Text> {detail.dado.fone}</Text>
            </View>
            <View style={styles.icon}>
              <Icon name="school" size={24} color="#000" style={styles.icons} />
              <Text> {detail.dado.curso}  </Text>
              <Text> {detail.dado.periodo}º período</Text>
            </View>

            <View style={styles.icon}>
              <Icon name="date-range" size={24} color="#000" style={styles.icons} />
              <Text> Data da coleta: </Text>
              <Text> {detail.dado.dataColeta}</Text>
            </View>
            <View style={styles.icon}>
              <Icon name="person" size={24} color="#000" style={styles.icons} />
              <Text> Pesquisador: </Text>
              <Text> {detail.dado.nomePesquisador}</Text>
            </View>
          </View>
          <View style={styles.detailPerfil}>
            <Text style={{ fontWeight: 'bold', fontSize: 17, margin: 7 }}>Calculos</Text>
            <Text style={styles.calculos}>avsdT = {calculos.avsdT}</Text>
            <Text style={styles.calculos}>jls = {calculos.jls}</Text>
            <Text style={styles.calculos}>msfF = {calculos.msfF}</Text>
            <Text style={styles.calculos}>msfSC = {calculos.msfSC}</Text>
            <Text style={styles.calculos}>sdF = {calculos.sdF}</Text>
            <Text style={styles.calculos}>sdT ={calculos.sdT}</Text>
            <Text style={styles.calculos}>sonsetF ={calculos.sonsetF}</Text>
            <Text style={styles.calculos}>sonsetT ={calculos.sonsetT}</Text>
          </View>
        </View>
      </ScrollView>

    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: '100%',
    backgroundColor: '#e6eef0',
    alignItems: 'center',
    // justifyContent: 'center'
  },
  perfil: {
    width: width - 50,
    height: 150,
    backgroundColor: '#0377fc',
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  cidadeView: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 15,
    borderRadius: 15,
  },
  cidadeText: {
    margin: 8,
    color: '#fff'
  },
  detailPerfil: {
    width: width - 50,
    backgroundColor: '#fff',
    // marginTop: 20,
    borderRadius: 8,
    marginBottom: 20

  },
  icon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  icons: {
    width: 25,
    height: 25,
    marginLeft: 10
  },
  imgPefil: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 15
  },
  viewInput: {
    marginLeft: 10,
    marginBottom: 5
  },
  calculos: {
    marginLeft: 10,
    marginBottom: 15,
    fontSize: 16
  }
})