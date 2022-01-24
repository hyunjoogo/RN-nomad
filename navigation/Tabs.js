import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from "react";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import {useColorScheme} from "react-native";
import {BLACK_COLOR, DARK_GREY, LIGHT_GREY, YELLOW_COLOR} from "../color";
import {Ionicons} from "@expo/vector-icons";
import Stack from "../screens/Stack";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === "dark";
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: isDark ? BLACK_COLOR : "white",
      }}
      screenOptions={{
      tabBarStyle: {
        backgroundColor: isDark ? BLACK_COLOR : "white",
      },
      tabBarActiveTintColor: isDark ? YELLOW_COLOR : BLACK_COLOR,
      tabBarInactiveTintColor: isDark ? DARK_GREY : LIGHT_GREY,
      headerStyle: {
        backgroundColor: isDark ? BLACK_COLOR : "white",
      },
      headerTitleStyle: {
        color: isDark ? "white" : BLACK_COLOR,
      },
      tabBarLabelStyle: {
        marginTop: -5,
        fontSize: 10,
        fontWeight: "600",
      },
    }}>
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({focused, color, size,}) => (
            <Ionicons name="film-outline" color={color} size={size}/>
          ),
        }}/>
      <Tab.Screen name="TV" options={{
        tabBarIcon: ({focused, color, size,}) => (
          <Ionicons name="tv-outline" color={color} size={size}/>
        ),
      }} component={Tv}/>
      <Tab.Screen name="Search" options={{
        tabBarIcon: ({focused, color, size,}) => (
          <Ionicons name="search" color={color} size={size}/>
        ),
      }} component={Search}/>
    </Tab.Navigator>
  )
}

export default Tabs;
