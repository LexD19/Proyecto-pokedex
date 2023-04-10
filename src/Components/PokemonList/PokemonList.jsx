import React, { useState, useEffect } from "react";
import axios from "axios";

const PokemonList = () => {
  const [users, setUsers] = useState([]);
  const [results, setResults] = useState([]);
  const [selectedType, setSelectedType] = useState("all");

  const URL = "https://pokeapi.co/api/v2/pokemon?limit=350";

  const fetchData = async () => {
    const response = await axios.get(URL);
    const pokemonList = await Promise.all(
      response.data.results.map(async (result) => {
        const pokemon = await axios.get(result.url).then((res) => res.data);
        return {
          name: pokemon.name,
          types: pokemon.types.map((type) => type.type.name),
          image: pokemon.sprites.front_default,
        };
      })
    );
    setUsers(pokemonList);
    setResults(pokemonList);
  };

  const handleFilter = (e) => {
    const type = e.target.dataset.type;
    setSelectedType(type);
    if (type === "all") {
      setResults(users);
    } else {
      const filteredResults = users.filter((pokemon) =>
        pokemon.types.includes(type)
      );
      setResults(filteredResults);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const types = [
    "all",
    "normal",
    "fire",
    "water",
    "electric",
    "grass",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy",
  ];

  const pokemonTypes = () => {
    return types.map((type) => (
      <button
        key={type}
        className={`btn btn-outline-secondary me-2 text-white ${
          selectedType === type ? "active" : ""
        }`}
        data-type={type}
        onClick={handleFilter}
      >
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </button>
    ));
  };

  const pokeData = () => {
    return results.map((pokemon) => {
      const types = pokemon.types ? pokemon.types.join(", ") : "";
      return (
        <tr key={pokemon.name}>
          <td style={{ color: "white" }}>{pokemon.name}</td>
          <td style={{ color: "white" }}>{types}</td>
          <td>
            <img src={pokemon.image} alt={pokemon.name} />
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      <div className="mb-3 text-white">{pokemonTypes()}</div>
      <table className="table table-striped table-hover mt-5 shadow lg text-white table-dark table-sm">
        <thead>
          <tr>
            <th className="bg-curse text-white">NAME</th>
            <th className="bg-curse text-white">TYPES</th>
            <th className="bg-curse text-white">IMAGE</th>
          </tr>
        </thead>
        <tbody>{pokeData()}</tbody>
      </table>
    </div>
  );
};

export default PokemonList;
