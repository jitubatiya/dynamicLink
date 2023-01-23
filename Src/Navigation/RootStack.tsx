import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Screen/Home';
import DetailScreen from '../Screen/DetailScreen';

const RootStackNav = createNativeStackNavigator();

const RootStack = () => (
    <RootStackNav.Navigator
        screenOptions={{
            headerShown: false, headerBackTitleVisible: false
        }}
    >
        <RootStackNav.Screen name={'Home'} component={Home} />
        <RootStackNav.Screen name={'detailScreen'} component={DetailScreen} />
    </RootStackNav.Navigator>
)
export default RootStack;