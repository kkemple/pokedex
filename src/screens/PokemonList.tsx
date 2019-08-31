import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Text,
  Animated,
  Easing
} from "react-native";
import { API, graphqlOperation } from "aws-amplify";

import { listPokemon } from "../graphql/queries";

const PokemonList = props => {
  const [animationValue] = useState(new Animated.Value(0));
  const [pokemon, setPokemon] = useState({
    items: [],
    nextToken: 0
  });

  const animationStyles = {
    transform: [
      {
        translateY: animationValue.interpolate({
          inputRange: [0, 0.55, 0.65, 0.75, 0.85, 1],
          outputRange: [0, 0, -30, -30, 0, 0]
        })
      },
      {
        rotateZ: animationValue.interpolate({
          inputRange: [0, 0.55, 0.65, 0.75, 0.85, 1],
          outputRange: ["0deg", "0deg", "-20deg", "20deg", "0deg", "0deg"]
        })
      }
    ]
  };

  useEffect(() => {
    API.graphql(graphqlOperation(listPokemon, { limit: 40 }))
      .then(result => setPokemon(result.data.listPokemon))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    if (!pokemon.items.length) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animationValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.linear)
          }),
          Animated.timing(animationValue, {
            toValue: 0,
            duration: 1000,
            easing: Easing.inOut(Easing.linear)
          })
        ])
      ).start();
    } else {
      animationValue.stopAnimation();
    }
  }, [pokemon.items.length]);

  const EmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Animated.Image
        style={[styles.pokeball, animationStyles]}
        source={require("../../assets/pokeball.png")}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokédex</Text>
      <FlatList
        ListEmptyComponent={EmptyComponent}
        contentContainerStyle={[
          styles.contentContainer,
          pokemon.items.length ? {} : { flex: 1 }
        ]}
        numColumns={2}
        data={pokemon.items.map(item => ({ ...item, key: item.name }))}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          API.graphql(
            graphqlOperation(listPokemon, {
              limit: 40,
              nextToken: pokemon.nextToken
            })
          )
            .then(result =>
              setPokemon({
                items: [...pokemon.items, ...result.data.listPokemon.items],
                nextToken: result.data.listPokemon.nextToken
              })
            )
            .catch(error => console.log(error));
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("PokemonDetail", {
                id: item.id,
                image: item.image,
                name: item.name
              });
            }}
            style={styles.pokemon}
            key={item.id}
          >
            <Image style={styles.img} source={{ uri: item.image }} />
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

PokemonList.navigationOptions = {
  header: null
};

export default PokemonList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: "center"
  },
  title: {
    fontFamily: "Pokemon",
    marginTop: 64,
    fontSize: 48
  },
  img: {
    width: 150,
    height: 150
  },
  contentContainer: {
    paddingTop: 24
  },
  name: {
    fontFamily: "Pokemon",
    textAlign: "center"
  },
  pokemon: {
    margin: 16
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  pokeball: {
    width: 150,
    height: 150
  }
});
