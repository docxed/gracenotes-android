import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const Activity = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>Welcome to Activity Page !!</Text>
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

export default Activity;