export interface Pokedex {
    count: number;
    next: string;
    previous: null;
    results: Result[];
}

export interface Result {
    name: string;
    url: string;
}

export interface PokemonsProps {
    name: string;
    no: number;
}