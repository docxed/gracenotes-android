import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import Note from '../screens/Note';
import Activity from '../screens/Activity';
import { NavigationContainer } from '@react-navigation/native'; // v.6.x
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


const Login_screen = createNativeStackNavigator();
const Home_screen = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



    function inside() {

        return(

            <Tab.Navigator>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Note" component={Note} />
                <Tab.Screen name="Activity" component={Activity} />
            </Tab.Navigator>



        );

    }


    export default function MyNavigator() {
        return (
            <NavigationContainer>
            <Login_screen.Navigator initialRouteName="Login">
            <Home_screen.Screen name="First_page" component={inside}
            options={{headerShown:false}}
            />
                
            <Login_screen.Screen name="Login" component={Login}
            options={{headerShown:false}}/>
            <Login_screen.Screen name="Register" component={Register} 
            options={{headerShown:false}}/>
            </Login_screen.Navigator>
            </NavigationContainer>
        );
        }
