/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './Src/Navigation/RootStack';
import dynamicLinks from '@react-native-firebase/dynamic-links';



const App = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer >


  )
}
export default App;