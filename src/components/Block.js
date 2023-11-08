import React from "react"
import {Button} from 'antd';
import '../css/block.css'

export default function Block({pokemon}) {
    const onClick = () => {
        window.location.assign('http://localhost:3000/pokemon/' + pokemon.id);
    }
    const onClickFight = () => {
        window.location.assign('http://localhost:3000/pokemon/' + pokemon.id + '/fight');
    }

    const onClickFTP = () => {
        fetchFTP()
    }

    async function fetchFTP() {
        const json = {'name': pokemon.name, "abils": pokemon.abils};
        const resp = await fetch('http://127.0.0.1:5000/poke/api/ftp', {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(json),
        });
        if (resp === true){
            console.log(resp)
        }
    }

    return (<div className="block">
        <div className="img" onClick={onClick}><img src={pokemon.picture}/></div>
        <div className="info">
            <div className={"name"} onClick={onClick}>{pokemon.name}</div>
            <div className="abils">{pokemon.abils}</div>
            <Button onClick={onClickFight}>Выбрать</Button>
            <Button onClick={onClickFTP}>сохранить</Button>
        </div>

    </div>)
}

