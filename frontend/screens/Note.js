import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const Note = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>Welcome to Note Page !!</Text>
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

export default Note;