// tslint:disable
// this is an auto generated file. This will be overwritten

export const listPokemon = `query ListPokemon($limit: Int, $nextToken: Int) {
  listPokemon(limit: $limit, nextToken: $nextToken) {
    nextToken
    items {
      baseExp
      height
      id
      image
      name
      weight
    }
  }
}
`;
export const pokemon = `query Pokemon($id: Int) {
  pokemon(id: $id) {
    abilities {
      id
    }
    baseExp
    height
    id
    image
    moves {
      id
    }
    name
    weight
  }
}
`;
