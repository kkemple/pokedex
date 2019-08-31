import React, { useState } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Amplify from "aws-amplify";
import { YellowBox } from "react-native";

import amplifyConfig from "./aws-exports";
import PokemonList from "./src/screens/PokemonList";
import PokemonDetail from "./src/screens/PokemonDetail";

YellowBox.ignoreWarnings(["Warning: `flexWrap: `wrap``"]);

Amplify.configure(amplifyConfig);

const AppNavigator = createStackNavigator(
  {
    PokemonList: PokemonList,
    PokemonDetail: PokemonDetail
  },
  {
    initialRouteName: "PokemonList"
  }
);

const App = createAppContainer(AppNavigator);

export default () => {
  const [appLoaded, setAppLoaded] = useState(false);

  const loadAppAssets = () => {
    return Font.loadAsync({
      Pokemon: require("./assets/fonts/Pokemon.ttf")
    });
  };

  return appLoaded ? (
    <App />
  ) : (
    <AppLoading
      startAsync={loadAppAssets}
      onFinish={() => setAppLoaded(true)}
    />
  );
};
