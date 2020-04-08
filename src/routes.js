/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Image } from 'react-native';
import { Block, Text, Button } from 'expo-ui-kit';
import { createStackNavigator } from '@react-navigation/stack';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

import Animated from 'react-native-reanimated';
import Home from './pages/Home';
import Mensagens from './pages/Mensagens';
import Contato from './pages/Contato';
// criar uma stack pra cada tela
// adicionar um botão no cabeçalho e chamar o drawer menu

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Telas = ({ navigation, style }) => {
  return (
    <Animated.View style={[{ flex: 1, overflow: 'hidden' }, style]}>
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          headerTitle: null,
          headerLeft: () => (
            <Button
              transparent
              padding
              marginHorizontal
              onPress={() => navigation.openDrawer()}
            >
              {/** adicionar um menu hamburguer */}
              <MaterialIcons name="menu" size={18} />
            </Button>
          ),
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Mensagens" component={Mensagens} />
        <Stack.Screen name="Contato" component={Contato} />
      </Stack.Navigator>
    </Animated.View>
  );
};

// criar um drawer menu customizado
// estilizar o drawer menu customizado

const DrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <Block>
        {/** adicionar avatar */}
        <Block flex={0.4} margin={20} bottom style={{ alignItems: 'center' }}>
          <Image
            source={{
              uri:
                'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png',
              height: 60,
              width: 60,
            }}
            resizeMode="center"
            style={{ borderRadius: 30 }}
          />
          <Text title white marginTop="2x">
            Drawer Animado
          </Text>
          <Text size={9} white marginTop>
            thaynanbreno@gmail.com
          </Text>
          <Text size={8} white marginTop>
            Feito por Taynan Breno Gonçalves Silva
          </Text>
        </Block>
        {/** adicionar icones pros itens */}
        <Block>
          <DrawerItem
            labelStyle={{ color: '#FFFFFF', marginLeft: -16 }}
            label="Home"
            onPress={() => props.navigation.navigate('Home')}
            icon={() => <MaterialIcons name="home" size={16} color="#FFFFFF" />}
          />
          <DrawerItem
            labelStyle={{ color: '#FFFFFF', marginLeft: -16 }}
            label="Mensagens"
            onPress={() => props.navigation.navigate('Mensagens')}
            icon={() => (
              <MaterialIcons name="message" size={16} color="#FFFFFF" />
            )}
          />
          <DrawerItem
            labelStyle={{ color: '#FFFFFF', marginLeft: -16 }}
            label="Contato"
            onPress={() => props.navigation.navigate('Contato')}
            icon={() => (
              <MaterialIcons name="phone" size={16} color="#FFFFFF" />
            )}
          />
        </Block>
      </Block>
      {/* adicionar logout */}
      <Block noflex top>
        <DrawerItem
          labelStyle={{ color: '#FFFFFF', marginLeft: -16 }}
          label="Logout"
          onPress={() => alert('Você tem certeza ? ')}
          icon={() => <MaterialIcons name="cancel" size={16} color="#FFFFFF" />}
        />
      </Block>
    </DrawerContentScrollView>
  );
};

export default function Routes() {
  const [progress, setProgress] = useState(new Animated.Value(0));
  // criar animação para as telas
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });

  // animar o borderRadius
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 10],
  });

  const screenStyles = { borderRadius, transform: [{ scale }] };
  return (
    <LinearGradient style={{ flex: 1 }} colors={['#00c6fb', '#005bea']}>
      <Drawer.Navigator
        // drawer animado com slide
        drawerType="slide"
        overlayColor="transparent"
        initialRouteName="Home"
        drawerStyle={{ width: '50%', backgroundColor: 'transparent' }}
        // contentContainerStyle={{ flex: 1 }}
        drawerContentOptions={{
          activeBackgroundColor: 'transparent',
        }}
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
        drawerContent={(props) => {
          setProgress(props.progress);
          return <DrawerContent {...props} />;
        }}
      >
        <Drawer.Screen name="Telas">
          {(props) => <Telas {...props} style={screenStyles} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </LinearGradient>
  );
}
