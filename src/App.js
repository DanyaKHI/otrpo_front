import React from "react"
import {useRoutes} from "react-router-dom";
import './index.css'
import Blocks from "./components/Blocks";
import Pokemon from "./components/Pokemon";
import Fight from "./components/Fight";

export default function App() {
    return useRoutes([
        {path: '/', element: <Blocks/>},
        {path: '/pokemon/:id', element: <Pokemon/>},
        {path: '/pokemon/:id/fight', element: <Fight/>},
    ])
}