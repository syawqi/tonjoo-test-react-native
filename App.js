import React, {Component} from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";

import LoginScreen from './src/pages/auth/login';
import ContactScreen from './src/pages/contacts';
import ContactFormScreen from './src/pages/contacts/form';

const App = createStackNavigator({
    Login: {
        screen: LoginScreen
    },
    Contact: {
        screen: ContactScreen
    },
    Form: {
        screen: ContactScreen
    }
}, {
    headerMode : 'none',
    initialRouteName : 'Login'
});

export default createAppContainer(App)
