import {Button} from "antd";
import React, {useEffect, useState} from "react";

export default function Pokemon() {
    const id = window.location.href.split('/').at(-1)
    const [pokemon, setPokemon] = useState({});

    async function fetchPokemon() {
        const resp = await fetch('http://127.0.0.1:5000/poke/api/pokemon/' + id);
        const data = await resp.json();
        setPokemon(data);
    }
    const onClickFight = () => {
        window.location.assign('http://localhost:3000/pokemon/' + id + '/fight');
    }
    useEffect(() => {
        fetchPokemon();
    }, []);

    return (<div className="block">
        <div className="img"><img src={pokemon.picture}/></div>
        <div className="info">
            <div className={"name"}>{pokemon.name}</div>
            <div className="abils">abils:{pokemon.abils}</div>
            <div>hp:{pokemon.hp}</div>
            <div>attack:{pokemon.attack}</div>
            <Button onClick={onClickFight}>Выбрать</Button>
        </div>

    </div>)
}