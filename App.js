import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { TouchableWithoutFeedback } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

//components
import Home from "./components/Home";

//styled components
import { Container } from "./styles/appStyles";

// Prevent native splash screen from autohiding before App component declaration
SplashScreen.preventAutoHideAsync()
  .then((result) =>
    console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`)
  )
  .catch(console.warn); // it's good to explicitly catch and inspect any error

export default function App() {
  React.useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 2000); // <-- Set this to `5000` ms to hide it after 5 seconds
  }, []);

  const loadTodos = () => {
    console.log("1");
    AsyncStorage.getItem("storedTodos")
      .then((data) => {
        console.log("2");
        if (data !== null) {
          console.log("3");
          setTodos(JSON.parse(data));
        }
      })
      .catch((error) => console.log(error));
  };

  //make sure it runs only ones
  useEffect(() => {
    loadTodos();
  }, []);

  //initial todos
  const initialTodos = [];

  const [todos, setTodos] = useState(initialTodos);

  NavigationBar.setPositionAsync("absolute");
  NavigationBar.setBackgroundColorAsync("#ffffff00");
  NavigationBar.setBorderColorAsync("#ffffff00");
  NavigationBar.setVisibilityAsync("hidden");
  return (
    <Container>
      <Home todos={todos} setTodos={setTodos} />
      <StatusBar style="light" />
    </Container>
  );
}
