import React, { useState, useEffect } from "react";
import {
  Animated,
  Easing,
  Image,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ScrollView
} from "react-native";
import { API, graphqlOperation } from "aws-amplify";
import { Ionicons } from "@expo/vector-icons";

const query = `query Pokemon($id: Int) {
  pokemon(id: $id) {
    abilities {
      details {
        name
        effect
      }
    }
    baseExp
    height
    id
    image
    moves {
      details {
        name
        effect
        flavorText
      }
    }
    name
    weight
  }
}
`;

const PokemonStats = props => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        EXP: {props.pokemon.baseExp}
      </Text>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        HEIGHT: {props.pokemon.height}
      </Text>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        WEIGHT: {props.pokemon.weight}
      </Text>
    </View>
  );
};

const PokemonAbilities = props => {
  return (
    <View style={{ flexDirection: "row", marginTop: 32 }}>
      <Ionicons size={24} name="ios-square" />
      <View style={{ marginTop: -8, marginLeft: 16 }}>
        <Text style={{ fontSize: 32, fontWeight: "bold" }}>Abilities</Text>
        {props.pokemon.abilities
          .sort((a, b) => {
            if (a.details.name > b.details.name) return 1;
            if (a.details.name < b.details.name) return -1;
            return 0;
          })
          .map(ability => (
            <View style={{ marginBottom: 16 }} key={ability.details.name}>
              <Text style={{ fontWeight: "bold" }}>{ability.details.name}</Text>
              <Text style={{}}>{ability.details.effect}</Text>
            </View>
          ))}
      </View>
    </View>
  );
};

const PokemonMoves = props => {
  return (
    <View style={{ flexDirection: "row", marginTop: 16 }}>
      <Ionicons size={24} name="ios-square" />
      <View style={{ marginTop: -8, marginLeft: 16 }}>
        <Text style={{ fontSize: 32, fontWeight: "bold" }}>Moves</Text>
        {props.pokemon.moves
          .sort((a, b) => {
            if (a.details.name > b.details.name) return 1;
            if (a.details.name < b.details.name) return -1;
            return 0;
          })
          .map(move => (
            <View style={{ marginBottom: 16 }} key={move.details.name}>
              <Text style={{ fontWeight: "bold" }}>{move.details.name}</Text>
              <Text style={{}}>
                {move.details.flavorText.replace("\n", " ")}
              </Text>
            </View>
          ))}
      </View>
    </View>
  );
};

const PokemonDetail = props => {
  const [pokemon, setPokemon] = useState(null);
  const [animationValue] = useState(new Animated.Value(0));

  const animationStyles = {
    transform: [
      {
        scaleX: animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.3]
        })
      },
      {
        scaleY: animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.3]
        })
      }
    ]
  };

  useEffect(() => {
    API.graphql(
      graphqlOperation(query, { id: props.navigation.getParam("id") })
    )
      .then(result => setPokemon(result.data.pokemon))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    if (!pokemon) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animationValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.linear),
            useNativeDriver: true
          }),
          Animated.timing(animationValue, {
            toValue: 0,
            duration: 1000,
            easing: Easing.inOut(Easing.linear),
            useNativeDriver: true
          })
        ])
      ).start();
    } else {
      animationValue.stopAnimation();
    }
  }, [pokemon]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={styles.nameContainer}
      >
        <Ionicons name="ios-arrow-back" size={36} />
        <Text style={styles.title}>{props.navigation.getParam("name")}</Text>
      </TouchableOpacity>
      <View style={styles.pokemon}>
        <Image
          style={styles.img}
          source={{ uri: props.navigation.getParam("image") }}
        />
        {!pokemon ? (
          <Animated.Text
            style={[
              {
                marginLeft: "auto",
                marginRight: "auto",
                fontSize: 24,
                fontFamily: "Pokemon"
              },
              animationStyles
            ]}
          >
            Loading data...
          </Animated.Text>
        ) : (
          <ScrollView>
            <PokemonStats pokemon={pokemon} />
            <PokemonAbilities pokemon={pokemon} />
            <PokemonMoves pokemon={pokemon} />
          </ScrollView>
        )}
      </View>
    </View>
  );
};

PokemonDetail.navigationOptions = {
  header: null
};

export default PokemonDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    paddingHorizontal: 24,
    paddingBottom: 36
  },
  title: {
    fontFamily: "Pokemon",
    fontSize: 32,
    paddingLeft: 18,
    minWidth: 200
  },
  img: {
    marginBottom: 36,
    marginLeft: "auto",
    marginRight: "auto",
    width: 250,
    height: 250
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%"
  },
  pokemon: {
    flex: 1,
    marginTop: 24
  }
});
