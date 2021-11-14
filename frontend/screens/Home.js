import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const Home_Screen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>Welcome to Home Page !!</Text>
      <Button title="Back to Login" onPress={() => { navigation.navigate("Login"); }}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    fontSize: 20,
  },
});

export default Home_Screen;