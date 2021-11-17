import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, MaterialIcons, Entypo, FontAwesome5} from '@expo/vector-icons';

import Login_Screen from '../screens/Login.js';
import Register_Screen from "../screens/Register.js";
import Home_Screen from "../screens/Home.js";
import Note_Screen from "../screens/Note.js";
import Home_Screen_Comment from '../screens/Home_Comment.js';
import Menu_Screen from '../screens/Menu.js';
import Profile_Screen from '../screens/Profile.js';
import Help_Screen from '../screens/Help.js';
import Help_Detail_Screen from '../screens/Help_Details.js';
import Grace_list_Screen from '../screens/MyNotes.js';
import Grace_Detail_Screen from '../screens/Grace_Detail.js';
import Help_Post_Screen from '../screens/Post_Help.js';


const Login_page = createNativeStackNavigator();
const Home_page = createNativeStackNavigator();
const Help_page = createNativeStackNavigator();
const Menu_page = createNativeStackNavigator();
const Grace_page = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function inhome() {
    return (
        <Home_page.Navigator initialRouteName="Home_first">
            <Home_page.Screen name="Home_first" component={Home_Screen}
            options={{headerShown: false}}/>
            <Home_page.Screen name="Home_Second" component={Home_Screen_Comment}
            options={{headerShown: false}}/>
        </Home_page.Navigator>
    );
}

function inHelp() {
    return (
        <Help_page.Navigator initialRouteName="Help_first">
            <Help_page.Screen name="Help_first" component={Help_Screen}
            options={{headerShown: false}}/>
            <Help_page.Screen name="Help_Second" component={Help_Detail_Screen}
            options={{headerShown: false}}/>
        </Help_page.Navigator>
    );
}

function inMenu() {
    return (
        <Menu_page.Navigator initialRouteName="Menu_st">
            <Menu_page.Screen name="Menu_st" component={Menu_Screen}
            options={{headerShown: false}}/>
            <Menu_page.Screen name="editProfile" component={Profile_Screen}
            options={{headerShown: false}}/>
            <Menu_page.Screen name="MyGrace" component={inGrace}
            options={{headerShown: false}}/>
            <Menu_page.Screen name="PostHelp" component={Help_Post_Screen}
            options={{headerShown: false}}/>
        </Menu_page.Navigator>
    );
}

function inGrace() {
    return (
        <Grace_page.Navigator initialRouteName="Grace_lists">
            <Grace_page.Screen name="Grace_lists" component={Grace_list_Screen}
            options={{headerShown: false}}/>
            <Grace_page.Screen name="Grace_Details" component={Grace_Detail_Screen}
            options={{headerShown: false}}/>
        </Grace_page.Navigator>
    );
}

function inside() {
    return (
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Home" component={inhome} 
            options={
                {
                    title: "หน้าแรก",
                    headerShown: false,
                    tabBarActiveTintColor: "seagreen",
                    tabBarIcon: ({color, focused}) => {
                        return <MaterialCommunityIcons focused={focused} color={color} name="home" size={30}/>;
                      }
                }
            }/>
            <Tab.Screen name="Note" component={Note_Screen} options={
                {
                    title: "เพิ่มบันทึกความดี",
                    headerShown:false,
                    tabBarActiveTintColor: "darkblue",
                    tabBarIcon: ({color, focused}) => {
                        return <MaterialIcons focused={focused} color={color} name="note-add" size={30}/>;
                      }
                }
            }/>
            <Tab.Screen name="Help" component={inHelp} options={
                {
                    title: "ความช่วยเหลือ",
                    headerShown:false,
                    tabBarActiveTintColor: "darkorange",
                    tabBarIcon: ({color, focused}) => {
                        return <FontAwesome5  focused={focused} color={color} name="hands-helping" size={30}/>;
                      }
                }
            }/>
            <Tab.Screen name="Menu" component={inMenu} options={
                {
                    title: "เมนู",
                    headerShown:false,
                    tabBarActiveTintColor: "slateblue",
                    tabBarIcon: ({color, focused}) => {
                        return <Entypo  focused={focused} color={color} name="menu" size={30}/>;
                      }
                }
            }/>
            
        </Tab.Navigator>
    );
}

export default function MyNavigator() {
    return (
        <NavigationContainer>
            <Login_page.Navigator initialRouteName="Login">
                <Login_page.Screen 
                    name="Login" 
                    component={Login_Screen}
                    options={{headerShown:false}}/>
                <Login_page.Screen 
                    name="Register" 
                    component={Register_Screen}
                    options={{headerShown:false}}/>
                <Login_page.Screen
                    name="Home_page"
                    component={inside}
                    options={{headerShown:false}}/>
            </Login_page.Navigator>
        </NavigationContainer>
    );
}
