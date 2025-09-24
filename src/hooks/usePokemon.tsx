import { useEffect, useState } from "react";

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
}

interface Props {
  id: number;
}

export const usePokemon = ({ id }: Props) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getPokemonById = async (id: number) => {
    setIsLoading(true);
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();

    setPokemon({
      id: id,
      name: data.name,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    getPokemonById(id);
  }, [id]);

  return {
    // Props
    isLoading,
    pokemon,

    FormattedId: id.toString().padStart(3, "0"),
  };
};
