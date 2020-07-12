/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type ListPokemonQueryVariables = {
  limit?: number | null,
  nextToken?: number | null,
};

export type ListPokemonQuery = {
  listPokemon:  {
    __typename: "PokemonConnection",
    nextToken: number | null,
    items:  Array< {
      __typename: "Pokemon",
      baseExp: number,
      height: number,
      id: number,
      image: string,
      name: string,
      weight: number,
    } | null > | null,
  } | null,
};

export type PokemonQueryVariables = {
  id?: number | null,
};

export type PokemonQuery = {
  pokemon:  {
    __typename: "Pokemon",
    abilities:  Array< {
      __typename: "PokemonAbility",
      id: string,
    } | null >,
    baseExp: number,
    height: number,
    id: number,
    image: string,
    moves:  Array< {
      __typename: "PokemonMove",
      id: string,
    } | null >,
    name: string,
    weight: number,
  } | null,
};
