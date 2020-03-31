import { createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation';
import React from 'react';
import Login from './pages/login';
import CreateUser from './pages/createUser';
import listTeste from './pages/listTeste';
import list from './pages/list';
import listAll from './pages/listAll';
import listAllMunique from './pages/listAllMunique';
import listMunique from './pages/listMunique';
import detailMunique from './pages/detailMunique';
import detail from './pages/detail';
import detailAll from './pages/detailAll';
import home from './pages/home';
// import muniqueGeral from './pages/muniqueGeral';
import veri from './pages/verificacao';
import Pesquisador from './pages/pesquisador';
import RecuperarSenha from './pages/RecuperarSenha';


const Router = createStackNavigator({
  'veri': {
    screen: veri,
    navigationOptions: {
      title: 'Verificação',
    }
  },
  'Login': {
    screen: Login,
    navigationOptions: {
      title: 'Bem Vindo',
    }
  },
  'RecuperarSenha': {
    screen: RecuperarSenha,
    navigationOptions: {
      title: 'Resetar senha',
    }
  },
  'home': {
    screen: home,
    navigationOptions: {
      title: 'Home',
    }
  },

  'list': {
    screen: list,
    navigationOptions: {
      title: 'Lista',
    }
  },
  'listAll': {
    screen: listAll,
    navigationOptions: {
      title: 'Lista geral',
    }
  },
  'listAllMunique': {
    screen: listAllMunique,
    navigationOptions: {
      title: 'Lista geral',
    }
  },
  'listMunique': {
    screen: listMunique,
    navigationOptions: {
      title: 'Lista',
    }
  },
  'CreateUser': {
    screen: CreateUser,
    navigationOptions: {
      title: 'Criar Usuario',
    }
  },
  'Pesquisador': {
    screen: Pesquisador,
    navigationOptions: {
      title: 'Cadastro',
    }
  },
  'detail': {
    screen: detail,
    navigationOptions: {
      title: 'Detalhes',
    }
  },
  'detailAll': {
    screen: detailAll,
    navigationOptions: {
      title: 'Detalhes',
    }
  },
  'detailMunique': {
    screen: detailMunique,
    navigationOptions: {
      title: 'Detalhes',
    }
  },


},
  {
    navigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#232955'
      },
      headerTintColor: '#fff'
    },
  });

const prefix = (Platform.OS === 'ios')
  ? 'https://'
  : 'https://www.google.com/';
export default () => <Router uriPrefix={prefix} />;
