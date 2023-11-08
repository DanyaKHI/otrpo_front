import React, {useEffect, useState} from "react";
import {Button, Input, InputNumber, Popover} from "antd";

export default function Fight() {
    let reee = ''
    const id = window.location.href.split('/').at(-2)
    const [userPokemon, setUserPokemon] = useState({});
    const [computerPokemon, setComputerPokemon] = useState({});
    const [countRounds, setCountRounds] = useState(0);
    const [userNumber, setUserNumber] = useState(1);
    const [result, setResult] = useState('');
    const [email, setEmail] = useState('');

    async function fetchPokemons() {
        const resp1 = await fetch('http://127.0.0.1:5000/poke/api/pokemon/random');
        const comp_id = await resp1.json();
        const resp2 = await fetch('http://127.0.0.1:5000/poke/api/fight/' + id + '/' + comp_id);
        const data = await resp2.json();
        setUserPokemon(data['user_pokemon']);
        setComputerPokemon(data['comp_pokemon'])
    }

    async function fetchPokemonsMove() {
        const json = {'user_pokemon': userPokemon, "comp_pokemon": computerPokemon};
        const resp = await fetch('http://127.0.0.1:5000/poke/api/fight/' + userNumber, {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(json),
        });
        const data = await resp.json();
        setUserPokemon(data['user_pokemon']);
        setComputerPokemon(data['comp_pokemon']);

        if (data['user_pokemon']['hp'] <= 0) {
            setResult('победил: ' + computerPokemon.name);
            reee = 'победил: ' + computerPokemon.name
            await fetchPokemonsFast();
        }
        if (data['comp_pokemon']['hp'] <= 0) {
            setResult('победил: ' + userPokemon.name);
            reee = 'победил: ' + userPokemon.name
            await fetchPokemonsFast();
        }

    }

    async function fetchPokemonsFast() {
        const json = {'user_pokemon': userPokemon, "comp_pokemon": computerPokemon};
        const resp = await fetch('http://127.0.0.1:5000/poke/api/fight/fast', {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(json),
        });
        const data = await resp.json();
        setResult(data)
        if (data['winner']['id'] === userPokemon.id) {
            setUserPokemon(data['winner']);
            setComputerPokemon(data['loser']);
            await setResult('победил: ' + userPokemon.name);
        } else {
            setUserPokemon(data['loser']);
            setComputerPokemon(data['winner']);
            await setResult('победил: ' + computerPokemon.name);
        }
        setCountRounds(data['rounds']);
    }

    async function fetchSend() {
        const json = {'result': result, "email": email};
        const resp = await fetch('http://127.0.0.1:5000/poke/api/fight/send', {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(json),
        });

    }


    useEffect(() => {
        fetchPokemons();
    }, []);

    const onChangeNumber = (number) => {
        setUserNumber(number);
    }
    const onClickMove = () => {
        setCountRounds(countRounds + 1);
        fetchPokemonsMove();
    }
    const onChange = (m) => {
        setEmail(m.target.value);
    }
    const onClickFast = () => {
        if (email === "") {
            alert('введите почту')
        } else {
            fetchPokemonsFast();
        }
    }
    const onClickSend = () => {
        fetchSend();
    }


    return (<div>
        <div>
            <div className="img"><img src={userPokemon.picture}/></div>
            <div className="info">
                <div className={"name"}>{userPokemon.name}</div>
                <div className="abils">abils:{userPokemon.abils}</div>
                <div>hp:{userPokemon.hp}</div>
                <div>attack:{userPokemon.attack}</div>
            </div>
            <div className="img"><img src={computerPokemon.picture}/></div>
            <div className="info">
                <div className={"name"}>{computerPokemon.name}</div>
                <div className="abils">abils:{computerPokemon.abils}</div>
                <div>hp:{computerPokemon.hp}</div>
                <div>attack:{computerPokemon.attack}</div>
            </div>
        </div>
        <InputNumber max={10} min={1} defaultValue={userNumber} onChange={onChangeNumber}></InputNumber>
        <Button onClick={onClickMove}>Сделать ход</Button>
        <Input onPressEnter={onChange}/>
        <Button onClick={onClickFast}>Быстрый бой</Button>
        <Button onClick={onClickSend}>отправить</Button>
        <div>{result}</div>
    </div>)
}