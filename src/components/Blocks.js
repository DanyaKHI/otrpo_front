import React, {useState, useEffect} from "react"
import '../css/blocks.css'
import Block from "./Block";
import {Button, Input, Pagination} from 'antd';


export default function Blocks() {
    const [pokemonsCount, setPokemonsCount] = useState(0);
    const [pokemons, setPokemons] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [search, setSearch] = useState("");

    async function fetchPokemonsCount() {
        const resp = await fetch('http://127.0.0.1:5000/poke/api/pokemon/count');
        const data = await resp.json();
        setPokemonsCount(data);
    }

    async function fetchPokemons(page = pageNumber) {
        const data = [];
        for (let i = page * 10 - 9; i < page * 10 + 1; i++) {
            const p = await fetch('http://127.0.0.1:5000/poke/api/pokemon/' + i);
            const w = await p.json()
            data.push(w);
        }
        setPokemons(data);
    }
    async function fetchPokemonsSearch(){
        const data = [];

        const p = await fetch('http://127.0.0.1:5000/poke/api/pokemon/list?name='+search);
        // const w = await p.json()['url'].at(-1);
        // const n = (await fetch('http://127.0.0.1:5000/poke/api/pokemon/' + w)).json();
        data.push(p);

        setPokemons(data);
    }

    const onChangePag = (index) => {
        setPageNumber(index);
        fetchPokemons(index);
    }

    useEffect(() => {

        fetchPokemonsCount();
        fetchPokemons();
        setPageNumber(1);
    }, []);

    const onClickSearch = () => {
        fetchPokemonsSearch();
    }
    const onChangeS = (r) => {
        setSearch(r.target.value);
    }

    return (<div className={"containerBlock"}>
        <div className={"blocks"}>
            <div>
                <Input onChange = {onChangeS}/> <Button onClick={onClickSearch}>Поиск</Button>
            </div>
            {pokemons.map((pokemon, index) => (
                <Block key={index} pokemon={pokemon}/>
            ))}
        </div>
        <Pagination pageSizeOptions={[10]} current={pageNumber} onChange={onChangePag} total={pokemonsCount}/>
    </div>)
}
